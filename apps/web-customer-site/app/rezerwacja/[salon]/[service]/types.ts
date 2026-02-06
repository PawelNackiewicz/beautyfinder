export interface Salon {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: number;
    address: string;
    phone: string;
}

export interface TimeSlot {
    id: string;
    date: string;
    time: string;
    available: boolean;
}

export interface Specialist {
    id: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    bio: string;
    certifications: string[];
}

export interface ServiceDetail {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    currency: string;
}

export interface BookingState {
    salon: Salon;
    service: ServiceDetail;
    specialist?: Specialist;
    date?: string;
    timeSlot?: TimeSlot;
}

export interface WarningAlert {
    title: string;
    message: string;
    icon: string;
}
