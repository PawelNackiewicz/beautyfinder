import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonModule } from './salon/salon.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [SalonModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
