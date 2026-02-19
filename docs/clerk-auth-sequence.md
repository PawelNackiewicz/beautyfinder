# Clerk Authorization Flow - Sequence Diagram

## Step-by-Step Request/Response Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant Browser as 🌐 Browser
    participant NextJS as 📱 Next.js<br/>web-customer-site
    participant Clerk as 🔑 Clerk Cloud
    participant NestJS as 🔐 NestJS<br/>api-customer
    participant DB as 🗄️ PostgreSQL

    User->>Browser: 1. Click "Zaloguj się"
    Browser->>Clerk: 2. Open Clerk SignIn UI
    User->>Clerk: 3. Enter email/password
    Clerk->>Browser: 4. Create session token + JWT
    Browser->>NextJS: 5. Set Clerk cookies

    Note over NextJS: Middleware detects logged in user
    NextJS->>NextJS: 6. middleware.ts: clerkMiddleware()
    NextJS->>Browser: 7. Redirect to /profile (protected)

    Note over Browser: User on Protected Route
    Browser->>NextJS: 8. GET /profile
    NextJS->>NextJS: 9. render profile/page.tsx
    NextJS->>Clerk: 10. auth().getToken()
    Clerk->>NextJS: 11. Return JWT (backend safe)

    Note over NextJS: Fetch Real Data from API
    NextJS->>NestJS: 12. GET /users/me<br/>Authorization: Bearer JWT

    Note over NestJS: Authentication Guard
    NestJS->>NestJS: 13. ClerkAuthGuard.canActivate()
    NestJS->>NestJS: 14. Extract Authorization header
    NestJS->>Clerk: 15. verifyToken(jwt, secretKey)
    Clerk->>NestJS: 16. Return verified payload {sub, email, ...}

    Note over NestJS: User Sync to Database
    NestJS->>NestJS: 17. UserSyncService.findOrCreateUser()
    NestJS->>NestJS: 18. Extract clerk_user_id from payload
    NestJS->>DB: 19. SELECT * FROM user_auth_identities<br/>WHERE provider='clerk'<br/>AND provider_user_id=clerk_id

    alt User Exists in DB
        DB->>NestJS: 20a. Return existing user + auth identity
        NestJS->>DB: 21a. UPDATE last_login timestamp
    else New User
        DB->>NestJS: 20b. No results
        NestJS->>DB: 21b. INSERT INTO users (email)
        NestJS->>DB: 22b. INSERT INTO user_auth_identities<br/>(user_id, provider, provider_user_id, ...)
        DB->>NestJS: 23b. Return created user record
    end

    Note over NestJS: Attach User to Request
    NestJS->>NestJS: 24. req.user = {id: uuid, email}

    Note over NestJS: Execute Controller Method
    NestJS->>NestJS: 25. @CurrentUser() → inject user object
    NestJS->>NestJS: 26. UserService.getUserProfile(user.id)
    NestJS->>DB: 27. SELECT id, email, phone FROM users<br/>WHERE id = user.id
    DB->>NestJS: 28. Return profile data

    NestJS->>Browser: 29. 200 OK + JSON profile
    Browser->>NextJS: 30. Process response
    NextJS->>Browser: 31. Render UserProfileCard + data
    Browser->>User: 32. ✅ Show profile with email, phone, etc.

    Note over DB: Database State After Login
    Note over DB: users: {id, email, ...}<br/>user_auth_identities:<br/>  {user_id, provider='clerk',<br/>   provider_user_id, last_login}
```

## Key Security Points

1. **JWT Verification** — Token verified server-side with Clerk secret key (not in browser)
2. **Lazy User Sync** — User created in DB on first login (automatic account creation)
3. **Provider Isolation** — `user_auth_identities` table allows multiple auth providers (Clerk, Google, Apple, etc.)
4. **Soft Delete Safe** — Unique indexes respect `deleted_at` column
5. **Multi-Tenancy Ready** — All queries filtered by `user_id` (UUID)

## Environment Variables Required

```bash
# apps/api-customer/.env
DATABASE_URL=postgresql://admin:strongpassword123@localhost:5432/jsonbdb
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXX  # From Clerk Dashboard
PORT=3001

# apps/web-customer-site/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXX
CLERK_SECRET_KEY=sk_test_XXXX
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Endpoints Protected by ClerkAuthGuard

| Endpoint | Method | Guards | Returns |
|----------|--------|--------|---------|
| `/users/me` | GET | ClerkAuthGuard | User profile (id, email, phone, createdAt) |
| `/users/me/appointments` | GET | ClerkAuthGuard | Array of user appointments |
| `/users/me/loyalty` | GET | ClerkAuthGuard | Loyalty balances per salon |
| `/users/me/reviews` | GET | ClerkAuthGuard | User's reviews (paginated) |

All other endpoints remain unprotected for now (salon catalog, reviews by salon, etc.).
