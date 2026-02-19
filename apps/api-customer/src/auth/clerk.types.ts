/**
 * Clerk JWT Payload - Structure of token returned by verifyToken()
 * Reference: https://clerk.com/docs/backend-requests/handling/jwt-templates
 */
export interface ClerkJWTPayload {
  iss: string; // Clerk issuer
  azp: string;
  aud: string[];
  sub: string; // Clerk user ID (unique identifier)
  auth_time: number; // Unix timestamp
  iat: number; // Issued at
  exp: number; // Expiration time
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;

  // User profile fields (available if configured in JWT template)
  firstName?: string; // Clerk returns as 'firstName' (camelCase)
  lastName?: string;
  fullName?: string;
  profileImageUrl?: string;

  // Metadata
  publicMetadata?: Record<string, unknown>;
  unsafeMetadata?: Record<string, unknown>;

  // Organization (if applicable)
  orgId?: string;
  orgSlug?: string;
  orgRole?: string;

  // Any other properties
  [key: string]: unknown;
}

/**
 * Normalized user data extracted from Clerk JWT
 * This is what we save to our database
 */
export interface ClerkUserData {
  clerkUserId: string; // JWT 'sub'
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
}
