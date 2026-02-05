export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    allergies: string;
    avatarUrl: string;
}

export interface Appointment {
    salonName: string;
    serviceName: string;
    date: string;
    time: string;
    address: string;
    price: string;
    status: string;
    stylistName: string;
    stylistRole: string;
    salonImage: string;
}

export interface PastVisit {
    id: number;
    salonName: string;
    serviceName: string;
    date: string;
    time: string;
    address: string;
    price: string;
    status: string;
    stylistName: string;
    stylistRole: string;
    rating: number;
    salonImage: string;
}

export interface Voucher {
    title: string;
    amount: string;
    validUntil: string;
    code: string;
}

export interface LoyaltyDiscount {
    title: string;
    percentage: string;
    subtitle: string;
    visitsToNext: number;
}

export interface LoyaltyPoints {
    title: string;
    points: number;
    subtitle: string;
}

export interface VouchersAndRewards {
    voucher: Voucher;
    loyaltyDiscount: LoyaltyDiscount;
    loyaltyPoints: LoyaltyPoints;
}
