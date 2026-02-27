import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request.url);

    if (errorResponse.statusCode >= 500) {
      this.logger.error(
        `${request.method} ${request.url} ${errorResponse.statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} ${errorResponse.statusCode} - ${errorResponse.message}`,
      );
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, path: string): ErrorResponse {
    const timestamp = new Date().toISOString();

    // NestJS HttpException (includes BadRequest, NotFound, Unauthorized, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as { message?: string | string[] }).message ??
            exception.message);

      return {
        statusCode: status,
        message: Array.isArray(message) ? message.join('; ') : message,
        error: HttpStatus[status] ?? 'Error',
        timestamp,
        path,
      };
    }

    // Prisma known request errors
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaError(exception, path, timestamp);
    }

    // Prisma validation errors
    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid data provided',
        error: 'BAD_REQUEST',
        timestamp,
        path,
      };
    }

    // Fallback: unknown errors
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'INTERNAL_SERVER_ERROR',
      timestamp,
      path,
    };
  }

  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
    path: string,
    timestamp: string,
  ): ErrorResponse {
    switch (exception.code) {
      // Unique constraint violation
      case 'P2002': {
        const target = (exception.meta?.target as string[]) ?? ['field'];
        return {
          statusCode: HttpStatus.CONFLICT,
          message: `Unique constraint violation on: ${target.join(', ')}`,
          error: 'CONFLICT',
          timestamp,
          path,
        };
      }

      // Record not found
      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Record not found',
          error: 'NOT_FOUND',
          timestamp,
          path,
        };

      // Foreign key constraint violation
      case 'P2003': {
        const field = (exception.meta?.field_name as string) ?? 'field';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Related record not found for: ${field}`,
          error: 'BAD_REQUEST',
          timestamp,
          path,
        };
      }

      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database error',
          error: 'INTERNAL_SERVER_ERROR',
          timestamp,
          path,
        };
    }
  }
}
