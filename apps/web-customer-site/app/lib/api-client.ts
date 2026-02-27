import { auth } from '@clerk/nextjs/server';
import { Salon } from './mockData';
import { generateSlug } from './utils';

interface ApiSalon {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  premiumUntil: string | null;
  rating: number;
  reviewCount: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchPremiumSalons(location?: string): Promise<Salon[]> {
  try {
    const url = new URL(`${API_URL}/salons/premium`);
    if (location) {
      url.searchParams.append('location', location);
    }

    const response = await fetch(url.toString(), {
      // Disable caching for SSR to always get fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const apiSalons: ApiSalon[] = await response.json();

    // Transform API data to match the UI's Salon interface
    return apiSalons.map((apiSalon) => ({
      id: apiSalon.id,
      slug: generateSlug(apiSalon.name),
      name: apiSalon.name,
      category: 'kosmetyczka', // Default category, could be enhanced later
      rating: apiSalon.rating,
      reviews: apiSalon.reviewCount,
      location: `${apiSalon.address}, ${apiSalon.city}`,
      city: apiSalon.city,
      citySlug: generateSlug(apiSalon.city),
      imageUrl: `https://picsum.photos/seed/salon${apiSalon.id}/400/300`,
      coordinates: null,
    }));
  } catch (error) {
    console.error('Error fetching premium salons:', error);
    // Return empty array on error to prevent page crash
    return [];
  }
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { getToken } = await auth();
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchUserProfile() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserAppointments() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/users/me/appointments`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch appointments: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserLoyalty() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/users/me/loyalty`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch loyalty balances: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserReviews() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/users/me/reviews`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }

  return response.json();
}
