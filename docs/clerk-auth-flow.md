# Clerk ↔ NestJS Authorization Flow

## Architecture Overview

```mermaid
graph TB
    subgraph Browser["🌐 Browser (Client)"]
        ClerkUI["Clerk SignIn/SignUp"]
        App["Next.js App<br/>web-customer-site"]
    end

    subgraph NextJS["📱 Next.js Frontend"]
        Middleware["middleware.ts<br/>clerkMiddleware"]
        ProtectedRoute["Protected Route<br/>/profile"]
        APIClient["api-client.ts<br/>getAuthHeaders()"]
    end

    subgraph NestJS["🔐 NestJS Backend"]
        Controller["UserController<br/>GET /users/me/*"]
        Guard["ClerkAuthGuard<br/>canActivate()"]
        UserSync["UserSyncService<br/>findOrCreateUser()"]
        Service["UserService<br/>DB Queries"]
    end

    subgraph Database["🗄️ PostgreSQL"]
        Users["users table"]
        AuthIdentities["user_auth_identities"]
        Appointments["appointments"]
        Loyalty["loyalty_balances"]
    end

    subgraph Clerk["🔑 Clerk Cloud"]
        ClerkJWT["JWT Validation<br/>verifyToken()"]
    end

    ClerkUI -->|1. User Logs In| App
    App -->|2. Session Token| Middleware
    Middleware -->|3. Redirect if logged in| ProtectedRoute
    ProtectedRoute -->|4. Load Page| APIClient

    APIClient -->|5. getToken()<br/>get JWT| ClerkJWT
    APIClient -->|6. Authorization:<br/>Bearer token| Controller

    Controller -->|7. Check Auth| Guard
    Guard -->|8. Verify JWT| ClerkJWT
    Guard -->|9. Extract<br/>clerk_user_id| UserSync

    UserSync -->|10. Find or Create| AuthIdentities
    AuthIdentities -->|11. Lookup| Users
    UserSync -->|12. Return<br/>user.id| Guard
    Guard -->|13. req.user = {id, email}| Controller

    Controller -->|14. @CurrentUser()| Service
    Service -->|15. SELECT ... WHERE user_id| Database
    Database -->|16. Appointments, Loyalty| Service
    Service -->|17. JSON Response| Controller
    Controller -->|18. 200 OK| APIClient
    APIClient -->|19. Display Data| ProtectedRoute

    style ClerkUI fill:#23a55a
    style Middleware fill:#0ea5e9
    style Guard fill:#f59e0b
    style AuthIdentities fill:#8b5cf6
    style ClerkJWT fill:#23a55a
