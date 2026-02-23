-- Beautyfinder Database Schema
-- PostgreSQL 13+ (Alpine compatible - no PostGIS)

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "citext";

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS salon_registrations CASCADE;
DROP TABLE IF EXISTS commission_invoices CASCADE;
DROP TABLE IF EXISTS loyalty_balances CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS appointment_status_history CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS staff_weekly_schedules CASCADE;
DROP TABLE IF EXISTS staff_treatment_capabilities CASCADE;
DROP TABLE IF EXISTS salon_user_roles CASCADE;
DROP TABLE IF EXISTS treatment_variant_addons CASCADE;
DROP TABLE IF EXISTS treatment_addons CASCADE;
DROP TABLE IF EXISTS treatment_variants CASCADE;
DROP TABLE IF EXISTS treatments CASCADE;
DROP TABLE IF EXISTS staff_profiles CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS salon_settings CASCADE;
DROP TABLE IF EXISTS salons CASCADE;
DROP TABLE IF EXISTS user_system_roles CASCADE;
DROP TABLE IF EXISTS system_roles CASCADE;
DROP TABLE IF EXISTS user_consents CASCADE;
DROP TABLE IF EXISTS user_auth_identities CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS consent_versions CASCADE;
DROP TABLE IF EXISTS consent_types CASCADE;

-- Drop types
DROP TYPE IF EXISTS appointment_status CASCADE;

-- Create custom types
CREATE TYPE appointment_status AS ENUM (
    'PENDING',
    'CONFIRMED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW'
);

-- ============================================================================
-- SYSTEM & CONSENT TABLES
-- ============================================================================

CREATE TABLE system_roles (
    slug VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE consent_types (
    slug VARCHAR(50) PRIMARY KEY,
    name TEXT NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE consent_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consent_type_slug VARCHAR(50) NOT NULL REFERENCES consent_types(slug) ON DELETE CASCADE,
    version_tag TEXT NOT NULL,
    content_summary TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_consent_versions_type ON consent_versions(consent_type_slug);
CREATE INDEX idx_consent_versions_published ON consent_versions(published_at DESC);

-- ============================================================================
-- USER TABLES
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT UNIQUE,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Unique constraints that respect soft delete
CREATE UNIQUE INDEX idx_users_email_active ON users(email) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX idx_users_phone_active ON users(phone) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_deleted ON users(deleted_at);

CREATE TABLE user_auth_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    metadata JSONB,
    last_login TIMESTAMPTZ
);

CREATE INDEX idx_user_auth_identities_user ON user_auth_identities(user_id);
CREATE UNIQUE INDEX idx_user_auth_identities_provider ON user_auth_identities(provider, provider_user_id);

CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_version_id UUID NOT NULL REFERENCES consent_versions(id) ON DELETE CASCADE,
    is_granted BOOLEAN NOT NULL,
    responded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    ip_address VARCHAR(45)
);

CREATE INDEX idx_user_consents_user ON user_consents(user_id);
CREATE INDEX idx_user_consents_version ON user_consents(consent_version_id);
CREATE INDEX idx_user_consents_responded ON user_consents(responded_at DESC);

CREATE TABLE user_system_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_slug VARCHAR(50) NOT NULL REFERENCES system_roles(slug) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_slug)
);

CREATE INDEX idx_user_system_roles_role ON user_system_roles(role_slug);

-- ============================================================================
-- SALON TABLES
-- ============================================================================

CREATE TABLE salons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug CITEXT UNIQUE NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'PLN'
);

CREATE INDEX idx_salons_slug ON salons(slug);

CREATE TABLE salon_settings (
    salon_id UUID PRIMARY KEY REFERENCES salons(id) ON DELETE CASCADE,
    settings JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Poland',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    working_hours JSONB
);

CREATE INDEX idx_locations_salon ON locations(salon_id);
CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);

-- ============================================================================
-- TREATMENT TABLES
-- ============================================================================

CREATE TABLE treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100)
);

CREATE INDEX idx_treatments_salon ON treatments(salon_id);
CREATE INDEX idx_treatments_category ON treatments(category);

CREATE TABLE treatment_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
    price_cents INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL
);

CREATE INDEX idx_treatment_variants_treatment ON treatment_variants(treatment_id);

CREATE TABLE treatment_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price_delta_cents INTEGER NOT NULL,
    duration_delta_minutes INTEGER NOT NULL
);

CREATE INDEX idx_treatment_addons_treatment ON treatment_addons(treatment_id);

CREATE TABLE treatment_variant_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_variant_id UUID NOT NULL REFERENCES treatment_variants(id) ON DELETE CASCADE,
    treatment_addon_id UUID NOT NULL REFERENCES treatment_addons(id) ON DELETE CASCADE,
    is_default BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_treatment_variant_addons_variant ON treatment_variant_addons(treatment_variant_id);
CREATE INDEX idx_treatment_variant_addons_addon ON treatment_variant_addons(treatment_addon_id);

-- ============================================================================
-- STAFF TABLES
-- ============================================================================

CREATE TABLE staff_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    display_name VARCHAR(255) NOT NULL,
    bio TEXT,
    visibility_period TSTZRANGE,
    job_title VARCHAR(100),
    social_links JSONB,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_staff_profiles_salon ON staff_profiles(salon_id);
CREATE INDEX idx_staff_profiles_visibility ON staff_profiles USING GIST(visibility_period);

CREATE TABLE staff_treatment_capabilities (
    staff_id UUID NOT NULL REFERENCES staff_profiles(user_id) ON DELETE CASCADE,
    treatment_variant_id UUID NOT NULL REFERENCES treatment_variants(id) ON DELETE CASCADE,
    custom_duration_minutes INTEGER,
    PRIMARY KEY (staff_id, treatment_variant_id)
);

CREATE INDEX idx_staff_treatment_capabilities_variant ON staff_treatment_capabilities(treatment_variant_id);

CREATE TABLE staff_weekly_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL REFERENCES staff_profiles(user_id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    available_ranges TSTZRANGE[],
    note TEXT
);

CREATE INDEX idx_staff_weekly_schedules_staff ON staff_weekly_schedules(staff_id);
CREATE INDEX idx_staff_weekly_schedules_location ON staff_weekly_schedules(location_id);
CREATE INDEX idx_staff_weekly_schedules_day ON staff_weekly_schedules(day_of_week);

CREATE TABLE salon_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_salon_user_roles_salon ON salon_user_roles(salon_id);
CREATE INDEX idx_salon_user_roles_user ON salon_user_roles(user_id);

-- ============================================================================
-- APPOINTMENT TABLES
-- ============================================================================

CREATE TABLE appointments (
    id UUID NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff_profiles(user_id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    treatment_variant_id UUID NOT NULL REFERENCES treatment_variants(id) ON DELETE CASCADE,
    status appointment_status NOT NULL DEFAULT 'PENDING',
    PRIMARY KEY (id, start_time)
) PARTITION BY RANGE (start_time);

CREATE INDEX idx_appointments_user ON appointments(user_id);
CREATE INDEX idx_appointments_staff ON appointments(staff_id);
CREATE INDEX idx_appointments_location ON appointments(location_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);

-- Create partitions for 2025-2027 (example - expand as needed)
CREATE TABLE appointments_2025 PARTITION OF appointments
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE appointments_2026 PARTITION OF appointments
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE appointments_2027 PARTITION OF appointments
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');

CREATE TABLE appointment_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL,
    status appointment_status NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    note TEXT
);

CREATE INDEX idx_appointment_status_history_appointment ON appointment_status_history(appointment_id);
CREATE INDEX idx_appointment_status_history_changed_at ON appointment_status_history(changed_at DESC);

-- ============================================================================
-- REVIEW TABLES
-- ============================================================================

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff_profiles(user_id) ON DELETE CASCADE,
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    photos JSONB,
    staff_reply TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_appointment ON reviews(appointment_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_staff ON reviews(staff_id);
CREATE INDEX idx_reviews_salon ON reviews(salon_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

-- ============================================================================
-- LOYALTY & BILLING TABLES
-- ============================================================================

CREATE TABLE loyalty_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    points INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, salon_id)
);

CREATE INDEX idx_loyalty_balances_user ON loyalty_balances(user_id);
CREATE INDEX idx_loyalty_balances_salon ON loyalty_balances(salon_id);

CREATE TABLE commission_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_amount NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_commission_invoices_salon ON commission_invoices(salon_id);
CREATE INDEX idx_commission_invoices_issued ON commission_invoices(issued_at DESC);

-- ============================================================================
-- SALON REGISTRATION TABLES
-- ============================================================================

CREATE TABLE salon_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID REFERENCES users(id) ON DELETE SET NULL,

    -- Step 1: Business Data
    public_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    nip VARCHAR(20) NOT NULL,
    main_category VARCHAR(100) NOT NULL,
    subcategories JSONB NOT NULL DEFAULT '[]',

    -- Step 2: Location
    street_address VARCHAR(255) NOT NULL,
    floor_unit VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website TEXT,

    -- Step 3: Presentation
    cover_photo_url TEXT,
    logo_url TEXT,
    gallery JSONB DEFAULT '[]',
    description TEXT NOT NULL,
    social_media JSONB DEFAULT '{}',
    amenities JSONB DEFAULT '[]',

    -- Step 4: Operational Settings
    working_hours JSONB NOT NULL,
    technical_break JSONB,
    station_count INTEGER NOT NULL DEFAULT 1,
    cancellation_policy VARCHAR(50) NOT NULL,

    -- Metadata
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_salon_registrations_status ON salon_registrations(status);
CREATE INDEX idx_salon_registrations_submitted_by ON salon_registrations(submitted_by);
CREATE INDEX idx_salon_registrations_created ON salon_registrations(created_at DESC);

-- ============================================================================
-- SAMPLE DATA INSERTS
-- ============================================================================

-- System Roles
INSERT INTO system_roles (slug, description) VALUES
('admin', 'Full system administrator'),
('support', 'Customer support staff'),
('moderator', 'Content moderator');

-- Consent Types
INSERT INTO consent_types (slug, name, is_mandatory) VALUES
('tos', 'Terms of Service', true),
('privacy', 'Privacy Policy', true),
('marketing', 'Marketing Communications', false),
('analytics', 'Analytics & Cookies', false);

-- Consent Versions
INSERT INTO consent_versions (id, consent_type_slug, version_tag, content_summary, published_at) VALUES
('11111111-1111-1111-1111-111111111111', 'tos', 'v1.0', 'Initial terms of service', '2025-01-01 00:00:00+00'),
('22222222-2222-2222-2222-222222222222', 'privacy', 'v1.0', 'Initial privacy policy', '2025-01-01 00:00:00+00'),
('33333333-3333-3333-3333-333333333333', 'marketing', 'v1.0', 'Marketing consent', '2025-01-01 00:00:00+00');

-- Users
INSERT INTO users (id, email, phone, created_at) VALUES
('a0000000-0000-0000-0000-000000000001', 'jan.kowalski@example.com', '+48501234567', '2025-06-01 10:00:00+00'),
('a0000000-0000-0000-0000-000000000002', 'anna.nowak@example.com', '+48502345678', '2025-06-05 14:30:00+00'),
('a0000000-0000-0000-0000-000000000003', 'piotr.wisniewski@example.com', '+48503456789', '2025-07-10 09:15:00+00'),
('a0000000-0000-0000-0000-000000000004', 'maria.wojcik@example.com', '+48504567890', '2025-08-15 11:45:00+00'),
('a0000000-0000-0000-0000-000000000005', 'tomasz.kowalczyk@example.com', '+48505678901', '2025-09-20 16:20:00+00');

-- User Auth Identities
INSERT INTO user_auth_identities (user_id, provider, provider_user_id, last_login) VALUES
('a0000000-0000-0000-0000-000000000001', 'google', 'google_123456', '2026-02-10 08:30:00+00'),
('a0000000-0000-0000-0000-000000000002', 'apple', 'apple_789012', '2026-02-12 19:45:00+00'),
('a0000000-0000-0000-0000-000000000003', 'local', 'local_345678', '2026-02-14 12:15:00+00'),
('a0000000-0000-0000-0000-000000000004', 'google', 'google_901234', '2026-02-15 10:00:00+00');

-- User Consents
INSERT INTO user_consents (user_id, consent_version_id, is_granted, responded_at, ip_address) VALUES
('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', true, '2025-06-01 10:01:00+00', '192.168.1.1'),
('a0000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', true, '2025-06-01 10:01:00+00', '192.168.1.1'),
('a0000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', true, '2025-06-01 10:02:00+00', '192.168.1.1'),
('a0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', true, '2025-06-05 14:31:00+00', '192.168.1.2'),
('a0000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', true, '2025-06-05 14:31:00+00', '192.168.1.2');

-- Salons
INSERT INTO salons (id, slug, currency) VALUES
('b0000000-0000-0000-0000-000000000001', 'bella-vita-warszawa', 'PLN'),
('b0000000-0000-0000-0000-000000000002', 'glamour-studio-krakow', 'PLN'),
('b0000000-0000-0000-0000-000000000003', 'beauty-spot-gdansk', 'PLN');

-- Salon Settings
INSERT INTO salon_settings (salon_id, settings) VALUES
('b0000000-0000-0000-0000-000000000001', '{"bookingLeadTime": 60, "cancellationPolicy": "24h", "autoConfirm": true}'),
('b0000000-0000-0000-0000-000000000002', '{"bookingLeadTime": 120, "cancellationPolicy": "48h", "autoConfirm": false}'),
('b0000000-0000-0000-0000-000000000003', '{"bookingLeadTime": 30, "cancellationPolicy": "12h", "autoConfirm": true}');

-- Locations
INSERT INTO locations (id, salon_id, name, street_address, postal_code, city, country, latitude, longitude, working_hours) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Salon Główny', 'ul. Marszałkowska 10/2', '00-001', 'Warszawa', 'Poland', 52.2297, 21.0122, '{"mon": "09:00-18:00", "tue": "09:00-18:00", "wed": "09:00-18:00", "thu": "09:00-18:00", "fri": "09:00-20:00", "sat": "10:00-16:00"}'),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Studio Główne', 'ul. Floriańska 15', '31-019', 'Kraków', 'Poland', 50.0647, 19.9450, '{"mon": "10:00-19:00", "tue": "10:00-19:00", "wed": "10:00-19:00", "thu": "10:00-19:00", "fri": "10:00-20:00", "sat": "09:00-15:00"}'),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'Beauty Centrum', 'ul. Długa 23', '80-827', 'Gdańsk', 'Poland', 54.3520, 18.6466, '{"mon": "09:00-17:00", "tue": "09:00-17:00", "wed": "09:00-17:00", "thu": "09:00-17:00", "fri": "09:00-18:00", "sat": "10:00-14:00"}');

-- Treatments
INSERT INTO treatments (id, salon_id, name, description, category) VALUES
('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Strzyżenie damskie', 'Profesjonalne strzyżenie z modelowaniem', 'Hair'),
('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Manicure hybrydowy', 'Trwały manicure z lakierem hybrydowym', 'Nails'),
('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'Masaż relaksacyjny', 'Masaż całego ciała z aromaterapią', 'Wellness'),
('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000003', 'Makijaż wieczorowy', 'Profesjonalny makijaż na specjalne okazje', 'Makeup');

-- Treatment Variants
INSERT INTO treatment_variants (id, treatment_id, price_cents, duration_minutes) VALUES
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 15000, 60),
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 20000, 90),
('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 12000, 75),
('e0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000003', 25000, 90),
('e0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000004', 18000, 60);

-- Treatment Addons
INSERT INTO treatment_addons (id, treatment_id, name, price_delta_cents, duration_delta_minutes) VALUES
('f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Koloryzacja pasemka', 5000, 30),
('f0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Zdobienie paznokci', 2000, 15),
('f0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Peeling ciała', 8000, 20);

-- Treatment Variant Addons
INSERT INTO treatment_variant_addons (treatment_variant_id, treatment_addon_id, is_default) VALUES
('e0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', false),
('e0000000-0000-0000-0000-000000000002', 'f0000000-0000-0000-0000-000000000001', false),
('e0000000-0000-0000-0000-000000000003', 'f0000000-0000-0000-0000-000000000002', false),
('e0000000-0000-0000-0000-000000000004', 'f0000000-0000-0000-0000-000000000003', true);

-- Staff Profiles
INSERT INTO staff_profiles (user_id, salon_id, display_name, bio, job_title, social_links, joined_at) VALUES
('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Piotr Stylistyczny', '10 lat doświadczenia w stylizacji włosów', 'Senior Stylist', '{"instagram": "@piotr_stylist", "facebook": "piotr.stylist"}', '2024-01-15 00:00:00+00'),
('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Maria Nails Master', 'Specjalistka od stylizacji paznokci', 'Nail Technician', '{"instagram": "@maria_nails"}', '2024-03-20 00:00:00+00'),
('a0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000002', 'Tomasz Relax', 'Certyfikowany masażysta', 'Massage Therapist', '{}', '2024-06-01 00:00:00+00');

-- Staff Treatment Capabilities
INSERT INTO staff_treatment_capabilities (staff_id, treatment_variant_id, custom_duration_minutes) VALUES
('a0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', NULL),
('a0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', NULL),
('a0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000003', 60),
('a0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000004', NULL);

-- Staff Weekly Schedules
INSERT INTO staff_weekly_schedules (staff_id, location_id, day_of_week, available_ranges, note) VALUES
('a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 1, ARRAY[tstzrange('2026-02-17 09:00:00+00', '2026-02-17 18:00:00+00')], 'Poniedziałek'),
('a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 2, ARRAY[tstzrange('2026-02-18 09:00:00+00', '2026-02-18 18:00:00+00')], 'Wtorek'),
('a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 1, ARRAY[tstzrange('2026-02-17 10:00:00+00', '2026-02-17 17:00:00+00')], 'Poniedziałek'),
('a0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 3, ARRAY[tstzrange('2026-02-19 10:00:00+00', '2026-02-19 19:00:00+00')], 'Środa');

-- Salon User Roles
INSERT INTO salon_user_roles (salon_id, user_id, role, granted_at) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'staff', '2024-01-15 00:00:00+00'),
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'staff', '2024-03-20 00:00:00+00'),
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'staff', '2024-06-01 00:00:00+00');

-- Appointments
INSERT INTO appointments (id, start_time, user_id, staff_id, location_id, treatment_variant_id, status) VALUES
('90000000-0000-0000-0000-000000000001', '2026-02-20 10:00:00+00', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'CONFIRMED'),
('90000000-0000-0000-0000-000000000002', '2026-02-21 14:00:00+00', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 'PENDING'),
('90000000-0000-0000-0000-000000000003', '2026-02-15 11:00:00+00', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'COMPLETED'),
('90000000-0000-0000-0000-000000000004', '2026-02-22 15:00:00+00', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000004', 'CONFIRMED');

-- Appointment Status History
INSERT INTO appointment_status_history (appointment_id, status, changed_at, changed_by, note) VALUES
('90000000-0000-0000-0000-000000000001', 'PENDING', '2026-02-10 12:00:00+00', 'a0000000-0000-0000-0000-000000000001', 'Initial booking'),
('90000000-0000-0000-0000-000000000001', 'CONFIRMED', '2026-02-10 12:05:00+00', NULL, 'Auto-confirmed by system'),
('90000000-0000-0000-0000-000000000003', 'PENDING', '2026-02-08 09:00:00+00', 'a0000000-0000-0000-0000-000000000001', 'Initial booking'),
('90000000-0000-0000-0000-000000000003', 'CONFIRMED', '2026-02-08 09:02:00+00', NULL, 'Confirmed by salon'),
('90000000-0000-0000-0000-000000000003', 'COMPLETED', '2026-02-15 12:00:00+00', 'a0000000-0000-0000-0000-000000000003', 'Service completed');

-- Reviews
INSERT INTO reviews (id, appointment_id, user_id, staff_id, salon_id, rating, comment, created_at) VALUES
('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 5, 'Wspaniała obsługa! Piotr jest najlepszym fryzjerem w Warszawie.', '2026-02-15 14:30:00+00');

-- Loyalty Balances
INSERT INTO loyalty_balances (user_id, salon_id, points, last_updated) VALUES
('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 150, '2026-02-15 12:00:00+00'),
('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 50, '2026-02-10 10:00:00+00'),
('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 0, '2025-12-01 00:00:00+00');

-- Commission Invoices
INSERT INTO commission_invoices (salon_id, issued_at, total_amount) VALUES
('b0000000-0000-0000-0000-000000000001', '2026-01-31 23:59:59+00', 4250.00),
('b0000000-0000-0000-0000-000000000002', '2026-01-31 23:59:59+00', 3100.00),
('b0000000-0000-0000-0000-000000000001', '2026-02-14 23:59:59+00', 1875.50);

-- Salon Registrations
INSERT INTO salon_registrations (id, submitted_by, public_name, company_name, nip, main_category, subcategories, street_address, floor_unit, postal_code, city, latitude, longitude, phone, email, website, description, social_media, amenities, working_hours, station_count, cancellation_policy, status, created_at) VALUES
('70000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Elegancja Beauty Studio', 'Elegancja Sp. z o.o.', '1234567890', 'Fryzjer', '["Strzyżenie", "Koloryzacja", "Stylizacja"]', 'ul. Marszałkowska 123', '2 piętro, lokal 5', '00-001', 'Warszawa', 52.2297, 21.0122, '+48 123 456 789', 'rezerwacje@elegancja.pl', 'https://www.elegancja.pl', 'Elegancja Beauty Studio to nowoczesny salon fryzjerski w samym sercu Warszawy. Specjalizujemy się w strzyżeniu, koloryzacji i stylizacji włosów. Nasz zespół doświadczonych stylistów zadba o Twój wygląd.', '{"instagram": "@elegancja_studio", "facebook": "facebook.com/elegancjastudio", "tiktok": "@elegancja"}', '["wifi", "parking", "air_conditioning", "card_payment"]', '{"monday": {"open": true, "start": "09:00", "end": "18:00"}, "tuesday": {"open": true, "start": "09:00", "end": "18:00"}, "wednesday": {"open": true, "start": "09:00", "end": "18:00"}, "thursday": {"open": true, "start": "09:00", "end": "18:00"}, "friday": {"open": true, "start": "09:00", "end": "20:00"}, "saturday": {"open": true, "start": "10:00", "end": "16:00"}, "sunday": {"open": false, "start": null, "end": null}}', 3, '24h', 'PENDING', '2026-02-18 10:30:00+00'),
('70000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Glamour Nails Kraków', 'Anna Nowak Glamour', '9876543210', 'Paznokcie', '["Manicure", "Pedicure"]', 'ul. Floriańska 42', NULL, '31-019', 'Kraków', 50.0647, 19.9450, '+48 987 654 321', 'kontakt@glamournails.pl', NULL, 'Glamour Nails to salon specjalizujący się w profesjonalnej stylizacji paznokci. Oferujemy manicure hybrydowy, żelowy oraz pedicure spa. Używamy tylko najwyższej jakości produktów renomowanych marek.', '{"instagram": "@glamour_nails_krakow"}', '["wifi", "card_payment", "drinks"]', '{"monday": {"open": true, "start": "10:00", "end": "19:00"}, "tuesday": {"open": true, "start": "10:00", "end": "19:00"}, "wednesday": {"open": true, "start": "10:00", "end": "19:00"}, "thursday": {"open": true, "start": "10:00", "end": "19:00"}, "friday": {"open": true, "start": "10:00", "end": "20:00"}, "saturday": {"open": true, "start": "09:00", "end": "15:00"}, "sunday": {"open": false, "start": null, "end": null}}', 2, '12h', 'APPROVED', '2026-02-15 14:00:00+00');
