import { z } from "zod";

// ============================================================================
// Step 1: Business Data
// ============================================================================
export const businessDataSchema = z.object({
    publicName: z
        .string()
        .min(1, "Nazwa publiczna jest wymagana")
        .max(255, "Nazwa publiczna może mieć maksymalnie 255 znaków"),
    companyName: z
        .string()
        .min(1, "Pełna nazwa firmy jest wymagana")
        .max(255, "Nazwa firmy może mieć maksymalnie 255 znaków"),
    nip: z
        .string()
        .regex(/^\d{10}$/, "NIP musi składać się z dokładnie 10 cyfr"),
    mainCategory: z.string().min(1, "Kategoria główna jest wymagana"),
    subcategories: z
        .array(z.string())
        .min(1, "Wybierz przynajmniej jedną podkategorię"),
});

// ============================================================================
// Step 2: Location
// ============================================================================
export const locationSchema = z.object({
    streetAddress: z
        .string()
        .min(1, "Ulica i numer jest wymagana")
        .max(255, "Adres może mieć maksymalnie 255 znaków"),
    floorUnit: z.string().max(100).optional().or(z.literal("")),
    postalCode: z
        .string()
        .regex(/^\d{2}-\d{3}$/, "Kod pocztowy w formacie XX-XXX"),
    city: z
        .string()
        .min(1, "Miasto jest wymagane")
        .max(100, "Miasto może mieć maksymalnie 100 znaków"),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    phone: z
        .string()
        .min(1, "Numer telefonu jest wymagany")
        .max(30, "Numer telefonu może mieć maksymalnie 30 znaków"),
    email: z.string().email("Podaj prawidłowy adres e-mail"),
    website: z.string().url("Podaj prawidłowy adres URL").optional().or(z.literal("")),
});

// ============================================================================
// Step 3: Presentation
// ============================================================================
export const presentationSchema = z.object({
    coverPhotoUrl: z.string().optional().or(z.literal("")),
    logoUrl: z.string().optional().or(z.literal("")),
    gallery: z.array(z.string()).optional().default([]),
    description: z
        .string()
        .min(150, "Opis musi mieć co najmniej 150 znaków"),
    socialMedia: z
        .object({
            instagram: z.string().optional().or(z.literal("")),
            facebook: z.string().optional().or(z.literal("")),
            tiktok: z.string().optional().or(z.literal("")),
        })
        .optional()
        .default({}),
    amenities: z.array(z.string()).optional().default([]),
});

// ============================================================================
// Step 4: Operational Settings
// ============================================================================
const dayScheduleSchema = z.object({
    open: z.boolean(),
    start: z.string().nullable(),
    end: z.string().nullable(),
});

export const operationalSchema = z.object({
    workingHours: z.object({
        monday: dayScheduleSchema,
        tuesday: dayScheduleSchema,
        wednesday: dayScheduleSchema,
        thursday: dayScheduleSchema,
        friday: dayScheduleSchema,
        saturday: dayScheduleSchema,
        sunday: dayScheduleSchema,
    }),
    technicalBreak: z
        .object({
            start: z.string(),
            end: z.string(),
        })
        .optional()
        .nullable(),
    stationCount: z.number().min(1, "Minimalna liczba stanowisk to 1"),
    cancellationPolicy: z.string().min(1, "Polityka odwołań jest wymagana"),
});

// ============================================================================
// Full form schema (used for final submission)
// ============================================================================
export const salonRegistrationSchema = businessDataSchema
    .merge(locationSchema)
    .merge(presentationSchema)
    .merge(operationalSchema);

// ============================================================================
// Types
// ============================================================================
export type BusinessDataForm = z.infer<typeof businessDataSchema>;
export type LocationForm = z.infer<typeof locationSchema>;
export type PresentationForm = z.infer<typeof presentationSchema>;
export type OperationalForm = z.infer<typeof operationalSchema>;
export type SalonRegistrationForm = z.infer<typeof salonRegistrationSchema>;

// ============================================================================
// Constants
// ============================================================================
export const MAIN_CATEGORIES = [
    "Fryzjer",
    "Paznokcie",
    "Makijaż",
    "Masaż",
    "Kosmetyka",
    "Depilacja",
    "Barber",
    "Medycyna estetyczna",
] as const;

export const SUBCATEGORIES = [
    "Koloryzacja",
    "Strzyżenie",
    "Stylizacja",
    "Manicure",
    "Pedicure",
    "Masaż",
    "Makijaż",
    "Brwi i rzęsy",
    "Depilacja",
    "Peeling",
    "Botox",
    "Kwas hialuronowy",
] as const;

export const AMENITIES = [
    { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
    { id: "parking", label: "Parking", icon: "Car" },
    { id: "air_conditioning", label: "Klimatyzacja", icon: "Wind" },
    { id: "disabled_access", label: "Dostęp dla osób niepełnosprawnych", icon: "Accessibility" },
    { id: "card_payment", label: "Płatność kartą", icon: "CreditCard" },
    { id: "drinks", label: "Napoje", icon: "Coffee" },
    { id: "music", label: "Muzyka", icon: "Music" },
    { id: "tv", label: "TV", icon: "Tv" },
] as const;

export const CANCELLATION_POLICIES = [
    { value: "flexible", label: "Elastyczna (do 2h przed wizytą)" },
    { value: "moderate", label: "Umiarkowana (do 12h przed wizytą)" },
    { value: "strict", label: "Restrykcyjna (do 24h przed wizytą)" },
    { value: "very_strict", label: "Bardzo restrykcyjna (do 48h przed wizytą)" },
] as const;

export const DAYS_OF_WEEK = [
    { key: "monday", label: "Poniedziałek" },
    { key: "tuesday", label: "Wtorek" },
    { key: "wednesday", label: "Środa" },
    { key: "thursday", label: "Czwartek" },
    { key: "friday", label: "Piątek" },
    { key: "saturday", label: "Sobota" },
    { key: "sunday", label: "Niedziela" },
] as const;

// ============================================================================
// Default values
// ============================================================================
export const DEFAULT_BUSINESS_DATA: BusinessDataForm = {
    publicName: "",
    companyName: "",
    nip: "",
    mainCategory: "",
    subcategories: [],
};

export const DEFAULT_LOCATION: LocationForm = {
    streetAddress: "",
    floorUnit: "",
    postalCode: "",
    city: "",
    latitude: 52.2297,
    longitude: 21.0122,
    phone: "",
    email: "",
    website: "",
};

export const DEFAULT_PRESENTATION: PresentationForm = {
    coverPhotoUrl: "",
    logoUrl: "",
    gallery: [],
    description: "",
    socialMedia: {
        instagram: "",
        facebook: "",
        tiktok: "",
    },
    amenities: [],
};

const defaultDaySchedule = (open: boolean, start = "09:00", end = "18:00") => ({
    open,
    start: open ? start : null,
    end: open ? end : null,
});

export const DEFAULT_OPERATIONAL: OperationalForm = {
    workingHours: {
        monday: defaultDaySchedule(true),
        tuesday: defaultDaySchedule(true),
        wednesday: defaultDaySchedule(true),
        thursday: defaultDaySchedule(true),
        friday: defaultDaySchedule(true, "09:00", "20:00"),
        saturday: defaultDaySchedule(true, "10:00", "16:00"),
        sunday: defaultDaySchedule(false),
    },
    technicalBreak: null,
    stationCount: 3,
    cancellationPolicy: "",
};

export const REGISTRATION_STEPS = [
    { id: 1, title: "Dane Biznesowe", description: "Podstawowe informacje" },
    { id: 2, title: "Lokalizacja", description: "Adres i kontakt" },
    { id: 3, title: "Prezentacja", description: "Zdjęcia i opis" },
    { id: 4, title: "Ustawienia Operacyjne", description: "Godziny i zasady" },
] as const;
