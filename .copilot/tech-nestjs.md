# NestJS Backend Standard

- **Architecture:** Controller -> Service -> Repository (Prisma).
- **Validation:** Use `class-validator` and DTOs for every endpoint.
- **Prowizje:** Every completed booking from `source: marketplace` must trigger `CommissionService`.
- **Security:** Use Guards for Role-Based Access Control (Owner, Manager, Staff, Customer).
- **Types:** Use shared types from `packages/shared-types`.
