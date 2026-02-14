# Product Requirements Document (PRD): Beautyfinder Ecosystem v1.0 (MVP)

## 1. Informacje Ogólne

| Parametr    | Wartość                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Produkt** | Beautyfinder (B2C Marketplace + B2B SaaS CRM)                                                                                                |
| **Status**  | Draft (MVP Definition)                                                                                                                       |
| **Cel**     | Zintegrowany ekosystem do zarządzania salonami beauty i rezerwacjami online z mechanizmami lojalnościowymi i dyscyplinującymi (Czarna Lista) |

---

## 2. Cele Biznesowe i Problemy

### Dla Salonów

- Redukcja strat wynikających z "no-shows"
- Automatyzacja kalendarza
- Pozyskiwanie nowych klientów przez Marketplace

### Dla Klientów

- Łatwa rezerwacja zweryfikowanych usług
- Dostęp do ofert Last Minute
- Zbieranie nagród za lojalność

### Monetyzacja

- **Stały abonament SaaS** od salonu
- **Prowizja od wizyt** pozyskanych przez Marketplace

---

## 3. Specyfikacja Funkcjonalna: B2B SaaS (System Operacyjny Salonu)

### 3.1. Zarządzanie Kalendarzem i Grafikami

#### Grafik Pracowników

- Oparty na "tygodniowym wzorcu" pracy
- Możliwość nakładania wyjątków (urlopy, przerwy)

#### Widok Kalendarza

- Interaktywny grid (Dzień/Tydzień)
- Funkcja drag-and-drop

#### Synchronizacja

- **Brak synchronizacji zewnętrznej** – System jest jedynym źródłem prawdy
- Brak integracji z Google Calendar w MVP

#### Warianty Usług

- Możliwość definiowania różnych czasów trwania i cen dla jednej usługi
  - Przykład: strzyżenie krótkie vs długie

### 3.2. CRM i Bezpieczeństwo Danych

#### Karta Klienta

- Historia zabiegów
- Notatki techniczne
- Sekcja "Dane Wrażliwe" (alergie, stan zdrowia)

#### Zgody RODO

- Dedykowany mechanizm zgód na przetwarzanie danych o zdrowiu
- Dane szyfrowane w bazie

#### Role i Uprawnienia

| Rola                 | Uprawnienia                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **Właściciel**       | Pełny dostęp, widok multi-location                                                              |
| **Manager/Recepcja** | Pełny dostęp do grafiku i bazy                                                                  |
| **Pracownik**        | Widok własnego grafiku, maskowanie danych kontaktowych klientów (brak możliwości pobrania bazy) |

### 3.3. Rozliczenia i Prowizje

#### Statusy Wizyt

- Realizacja
- No-show
- Anulacja

#### Mechanizm Auto-complete

- Wizyta zmienia status na "Zrealizowana" automatycznie na koniec dnia
- Wymóg: salon nie zgłosił inaczej
- Podstawa do naliczenia prowizji

#### Fakturowanie

- Moduł raportowania zrealizowanych wizyt z Marketplace
- Generowanie faktur zbiorczych za prowizję + abonament

---

## 4. Specyfikacja Funkcjonalna: B2C Marketplace (Aplikacja Klienta)

### 4.1. Rezerwacje i Profil

#### Rejestracja

- **Obowiązkowa** – Brak Guest Checkout
- Logowanie przez:
  - Google
  - Apple
  - Social Media

#### Wyszukiwarka

- **Ranking oparty na algorytmie:**
  - Dostępność (<48h)
  - Ocena
  - Odległość

#### SEO Local

- Dynamicznie generowane Landing Pages salonów
- Indeksowane w Google

### 4.2. Mechanizmy Lojalnościowe i Dyscyplinarne

#### Program Lojalnościowy

- Punkty zbierane w Salonie X mogą być wydane tylko w Salonie X
- Konwersja: 1 zł = 1 pkt

#### Czarna Lista

- Globalna blokada konta po przekroczeniu limitu nieobecności
- Parametry ustawiane przez salon w oknie anulacji

#### Opinie

- Możliwość wystawienia oceny (gwiazdki + tekst)
- **Wymóg:** wizyta musi być oznaczona jako "Zrealizowana"

---

## 5. Architektura i Logika Danych (ERD Highlights)

### 5.1. Multi-tenancy

- System musi obsługiwać separację danych pomiędzy salonami
- Jednoczesne wsparcie dla konta Właściciela zarządzającego wieloma lokalizacjami

### 5.2. Kluczowe Encje

| Encja              | Opis                                                    |
| ------------------ | ------------------------------------------------------- |
| **User**           | B2C Client / B2B Staff                                  |
| **Salon**          | Tenant, Dane SEO, Lokalizacja, Ustawienia Okna Anulacji |
| **Service**        | Base Service + Variants                                 |
| **Appointment**    | Time, Status, FinalPrice, CommissionValue               |
| **LoyaltyBalance** | UserID, SalonID, PointsAmount                           |

---

## 6. Wymagania Techniczne i UX

### Responsywność

- Standard Mobile-First (RWD) dla wszystkich modułów

### Powiadomienia

- **Push/E-mail:** Podstawowy kanał komunikacji (bezpłatny)
- **SMS:** Limitowany pakiet w abonamencie
  - Po przekroczeniu – płatność za sztukę

### Import Danych

- Moduł importera CSV dla nowych salonów
- Baza klientów

---

## 7. Wskaźniki Sukcesu (KPI)

| KPI                    | Opis                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| **Conversion Rate**    | % zarejestrowanych użytkowników dokonujących pierwszej rezerwacji |
| **No-show Rate**       | Spadek liczby nieobecności dzięki Czarnej Liście                  |
| **LTV Salonu**         | Średni czas utrzymania subskrypcji B2B                            |
| **Commission Revenue** | Przychód z prowizji generowany przez Marketplace                  |

---

## 8. Harmonogram i Ryzyka (MVP)

### Ryzyko 1: Brak Google Sync

**Problem:** Może zniechęcać salony

**Mitygacja:**

- Prosty importer CSV
- UI przyjazny dla mobile

### Ryzyko 2: Omijanie Prowizji

**Problem:** Salony mogą omijać system do naliczania prowizji

**Mitygacja:**

- Mechanizm Auto-complete
- Wymóg oznaczania wizyt dla punktów lojalnościowych klienta

---

## Podsumowanie Biznesowe

Beautyfinder stanowi integracyjne rozwiązanie dla branży beauty, łączące doświadczenie klienta (B2C) z narzędziami operacyjnymi dla salonu (B2B). Model hybrydowy monetyzacji (abonament + prowizja) zapewnia stały przychód, podczas gdy mechanizmy dyscyplinujące (Czarna Lista) i lojalnościowe (Punkty) zmniejszają no-show i zwiększają lifetime value.
