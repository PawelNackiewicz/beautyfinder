-- Migration: Add salon_registrations table
-- Description: Stores multi-step salon registration form submissions

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
