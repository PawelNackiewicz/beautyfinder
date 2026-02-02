export interface Expert {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    imageUrl: string;
    verified: boolean;
}

export const mockExperts: Expert[] = [
    {
        id: "1",
        name: "Anna Kowalska",
        specialization: "Hair Stylist",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        verified: true,
    },
    {
        id: "2",
        name: "Marek Nowak",
        specialization: "Master Barber",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        verified: true,
    },
    {
        id: "3",
        name: "Ewa Wiśniewska",
        specialization: "Nail Technician",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        verified: true,
    },
    {
        id: "4",
        name: "Tomasz Lewandowski",
        specialization: "Massage Therapist",
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        verified: true,
    },
    {
        id: "5",
        name: "Izabela Dombrowska",
        specialization: "Lash Specialist",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        verified: true,
    },
];