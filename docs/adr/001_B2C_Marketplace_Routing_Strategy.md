# ADR 003: B2C Marketplace Routing Strategy

## Status

Accepted

## Context

The Beautyfinder ecosystem requires a routing structure that balances User Experience (UX) with high-performance Local SEO for the Polish market.
Key requirements included:

- Strong visibility for specific services (e.g., "Laminacja rzęs").
- Local search optimization for salons and specialists.
- Support for a "Social Media-ready" specialist profile.
- Mandatory registration (no guest checkout).

## Decision

We will implement a **Hierarchical SEO-Optimized Routing** with independent top-level slugs for services.

### Route Map (Polish slugs for SEO):

| Target Page            | Path                          | Dynamic Segment                              |
| :--------------------- | :---------------------------- | :------------------------------------------- |
| **Home Page**          | `/`                           | N/A                                          |
| **Authentication**     | `/logowanie`                  | Login, Register, Password Reset              |
| **User Profile**       | `/profil`                     | Protected route (History, Allergies, Points) |
| **Service Category**   | `/uslugi/:service-slug`       | e.g., `/uslugi/makijaz-permanentny`          |
| **Salon Profile**      | `/salon/:salon-slug`          | e.g., `/salon/pro-beauty-opole`              |
| **Specialist Profile** | `/specjalista/:staff-slug`    | e.g., `/specjalista/katarzyna-kowalska`      |
| **Booking Flow**       | `/rezerwacja/:salon/:service` | Multi-step booking engine                    |
| **B2B Lead Gen**       | `/dodaj-salon`                | Registration for salons (Lead generation)    |

## Consequences

### Positive (Pros):

- **SEO Authority:** Top-level `/uslugi/` paths allow for ranking on broad service terms across Poland.
- **Local SEO:** Including location/brand name in `/salon/` slugs boosts visibility in Google Maps and local search results.
- **Scalability:** Separate routes for specialists allow them to exist independently of salons (as per business requirements).
- **Readability:** URLs are clean, descriptive, and easy to share on social media.

### Negative (Cons):

- **Slug Management:** Requires a robust slug-generation system to avoid collisions (especially for specialists with the same names).
- **Redirection Debt:** Any change in a salon's name or service category will require a 301 redirect to maintain SEO juice.

## Implementation Notes

- All slugs must be sanitized (lowercase, no Polish special characters like 'ą', 'ę' → 'a', 'e').
- The `/rezerwacja` route must be protected by an authentication middleware.
- "Blacklist" check must be performed before the final step of the booking process.
