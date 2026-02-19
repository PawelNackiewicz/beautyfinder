# User Profile Synchronization - Clerk ↔ Database

## 📋 Podsumowanie Implementacji

Zaimplementowaliśmy **hybrid architecture** do synchronizacji danych użytkownika z Clerka do naszej bazy PostgreSQL.

### Diagram Przepływu

```
[User loguje się na Clerku]
         ↓
[JWT zawiera: firstName, lastName, profileImageUrl, etc.]
         ↓
[ClerkAuthGuard]
  ├─ Weryfikuje token z @clerk/backend
  └─ Ekstraktuje pełne dane z JWT payload
         ↓
[UserSyncService.findOrCreateUser(clerkPayload)]
  ├─ Jeśli user istnieje → UPDATE profile fields
  └─ Jeśli nowy user → INSERT + synchronizacja
         ↓
[Archiwizuj full payload w metadata JSONB]
         ↓
[req.user zawiera uid + email]
         ↓
[GET /users/me zwraca firstName, lastName, avatarUrl, etc.]
         ↓
[Frontend wyświetla Avatar + Full Name]
```

---

## 🗄️ Zmiany w Bazie Danych

### Nowe Kolumny w `users` Tabeli

| Kolumna | Typ | Nullable | Opis |
|---------|-----|----------|------|
| `first_name` | VARCHAR(100) | ✅ | Imię (z Clerka/Google) |
| `last_name` | VARCHAR(100) | ✅ | Nazwisko (z Clerka/Google) |
| `full_name` | VARCHAR(255) | ✅ | Pełne imię (computed) |
| `avatar_url` | TEXT | ✅ | URL avatara (z Clerka/Google) |
| `gender` | VARCHAR(20) | ✅ | M, F, Other (z Clerka) |
| `date_of_birth` | DATE | ✅ | Data urodzenia (z Clerka) |
| `auth_provider` | VARCHAR(50) | ✅ | 'clerk' \| 'google' \| 'apple' |
| `last_synced_at` | TIMESTAMPTZ | ✅ | Kiedy ostatnio zsyncowano |

**Indeksy:**
```sql
CREATE INDEX idx_users_first_name ON users(first_name);
CREATE INDEX idx_users_last_name ON users(last_name);
CREATE INDEX idx_users_full_name ON users(full_name);
```

### Zmiany w `user_auth_identities`

- `metadata` kolumna teraz **przechowuje pełny JWT payload** od Clerka
- Archiwizacja dla compliance + audit trail

```json
{
  "sub": "user_abc123",
  "email": "anna@example.com",
  "firstName": "Anna",
  "lastName": "Nowak",
  "profileImageUrl": "https://...",
  "phone_number": "+48501234567",
  "publicMetadata": {...},
  "unsafeMetadata": {...}
}
```

---

## 💻 Zmiany w Kodzie

### 1. Nowy Typ - `clerk.types.ts`

```typescript
export interface ClerkJWTPayload {
  sub: string; // Clerk user ID
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  profileImageUrl?: string;
  phone_number?: string;
  // ... inne pola
}

export interface ClerkUserData {
  clerkUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  // ... mapowane pola
}
```

### 2. Zaktualizowana `UserSyncService`

```typescript
async findOrCreateUser(clerkPayload: ClerkJWTPayload) {
  const clerkData = this.extractClerkUserData(clerkPayload);

  // Szukamy istniejącego wpisu
  const userAuthIdentity = await findUnique({
    provider: 'clerk',
    providerUserId: clerkData.clerkUserId
  });

  if (userAuthIdentity) {
    // SYNCHRONIZUJ dane
    await prisma.user.update({
      firstName: clerkData.firstName,
      lastName: clerkData.lastName,
      avatarUrl: clerkData.avatarUrl,
      lastSyncedAt: new Date()
    });
  } else {
    // UTWÓRZ nowego użytkownika
    await prisma.user.create({
      firstName: clerkData.firstName,
      lastName: clerkData.lastName,
      // ... itd
      authIdentities: {
        create: {
          provider: 'clerk',
          metadata: clerkPayload // archiwum
        }
      }
    });
  }
}
```

### 3. Zaktualizowana `ClerkAuthGuard`

```typescript
const decoded = await verifyToken(token, { secretKey });
const user = await userSyncService.findOrCreateUser(decoded);
request.user = { id: user.id, email: user.email };
```

### 4. Zaktualizowana `UserService.getUserProfile()`

Zwraca teraz:
- `firstName`, `lastName`, `fullName`
- `avatarUrl`
- `gender`, `dateOfBirth`
- `authProvider`, `lastSyncedAt`

### 5. API Endpoint

```typescript
GET /users/me
Authorization: Bearer <clerk_jwt>

Response:
{
  "id": "uuid",
  "email": "anna@example.com",
  "firstName": "Anna",
  "lastName": "Nowak",
  "fullName": "Anna Nowak",
  "avatarUrl": "https://...",
  "phone": "+48501234567",
  "gender": null,
  "dateOfBirth": null,
  "authProvider": "clerk",
  "createdAt": "2025-02-18T...",
  "lastSyncedAt": "2025-02-18T..."
}
```

### 6. Frontend Integration

`UserProfileCard` teraz wyświetla:
- Avatar (z `avatarUrl`)
- Full name (`${firstName} ${lastName}`)
- Email i phone
- Edit button

---

## 🔄 Synchronizacja: Kiedy Się Dzieje?

### ✅ Lazy Sync (Na każde logowanie)
```
User loguje się → verifyToken() → UserSyncService → UPDATE/INSERT → Done
Cost: 1 query per login
```

### 🔔 (Future) Webhooks od Clerka
```
User zmienia imię w Clerku → Webhook POST /webhooks/clerk
→ Update naszej bazy natychmiast
Cost: Realtime, minimal overhead
```

---

## 🧪 Testowanie

### 1. Zaloguj się na `localhost:3000`
```
Przejdź do: http://localhost:3000/profile
```

### 2. Sprawdź browser DevTools
```
Network tab → GET /users/me
Powinien zwrócić:
{
  "firstName": "Anna",
  "lastName": "Nowak",
  "avatarUrl": "https://...",
  ...
}
```

### 3. Sprawdź bazę danych
```bash
# W pgAdmin (http://localhost:5050)
SELECT id, email, first_name, last_name, avatar_url, auth_provider, last_synced_at
FROM users
WHERE id = '<twój-uuid>';

# Powinieneś zobaczyć:
id          | abc123...
email       | user@example.com
first_name  | Anna
last_name   | Nowak
avatar_url  | https://...
auth_provider | clerk
last_synced_at | 2025-02-18T...
```

### 4. Sprawdź metadata w `user_auth_identities`
```bash
SELECT metadata
FROM user_auth_identities
WHERE provider = 'clerk';

# Powinieneś zobaczyć pełny JWT payload
```

---

## 📊 Architektura: Denormalizacja vs. Normalizacja

Wybraliśmy **Hybrid Approach**:

| Co | Gdzie | Dlaczego |
|----|----|----------|
| **Key fields** (imię, nazwisko, avatar) | `users` table | Szybkie queries, indeksy, type-safety |
| **Full payload** | `user_auth_identities.metadata` (JSON) | Archiwum, audit trail, compliance |

**Pros:**
- ✅ Szybkie queryowanie (indeksy na first_name, last_name)
- ✅ Pełna historia (metadata)
- ✅ Type-safe (users.firstName jest typowany)
- ✅ Elastyczne (można dodać webhooks dla realtime sync)

**Cons:**
- ⚠️ Duplikacja danych (ale kontrolowana)
- ⚠️ Trzeba synchronizować na zmianę w Clerku (webhooks)

---

## 🔐 Security Considerations

1. **JWT Verification** — Weryfikujemy token z Clerk secret key (server-side)
2. **Lazy Sync** — User created automatically on first login (no manual approval needed)
3. **Metadata Archiving** — Pełny payload przechowywany dla audit trail
4. **Soft Delete** — `deleted_at` respektowany w queries
5. **Multi-tenancy** — Wszystkie queries filtrują po `user_id`

---

## 🚀 Next Steps

### 1. (Optional) Clerk Webhooks
```bash
# Skonfiguruj webhook w Clerk Dashboard:
POST /webhooks/clerk → Update user profile when changed in Clerk
```

### 2. (Optional) Additional Fields
Jeśli potrzebne dodatkowe pola (address, allerg...):
```bash
ALTER TABLE users ADD COLUMN medical_notes TEXT;
# + zaktualizuj schema.prisma + UserSyncService
```

### 3. (Optional) Frontend: Edit Profile
```typescript
// /profile/edit mogą pozwolić na zmianę:
// - phone, gender, dateOfBirth
// Clerk firstName/lastName jest RO (read-only, zmienia się w Clerku)
```

### 4. (Future) Multi-Provider Support
```typescript
// Jeśli chcesz obsługiwać Google, Apple:
const clerkData = {
  clerkUserId: decoded.sub,
  provider: 'clerk', // lub 'google', 'apple'
  email: decoded.email,
  firstName: decoded.firstName || decoded.given_name,
  avatarUrl: decoded.profileImageUrl || decoded.picture
};
```

---

## 📝 Migration Checklist

- [x] Dodano kolumny do `users` table
- [x] Stworzono `clerk.types.ts`
- [x] Zaktualizowano `UserSyncService`
- [x] Zaktualizowano `ClerkAuthGuard`
- [x] Zaktualizowano `UserService`
- [x] Zaktualizowano API endpoint `/users/me`
- [x] Zaktualizowano frontend `UserProfileCard`
- [x] Linting passed ✅
- [ ] Webhooks (future)
- [ ] Edit profile page (future)
