'use server';

import { auth } from '@clerk/nextjs/server';
import { Salon } from './mockData';

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

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
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
    return apiSalons.map((apiSalon, index) => ({
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
      coordinates: {
        // Placeholder coordinates, could be enhanced with geocoding
        // Randomize coordinates around Warsaw for better visual if no real coords
        lat: 52.2297 + (Math.random() - 0.5) * 0.1,
        lng: 21.0122 + (Math.random() - 0.5) * 0.1,
      },
    }));
  } catch (error) {
    console.error('Error fetching premium salons:', error);
    // Return empty array on error to prevent page crash
    return [];
  }
}

async function getAuthHeaders() {
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
