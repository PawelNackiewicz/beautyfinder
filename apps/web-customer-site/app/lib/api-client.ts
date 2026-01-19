import { Salon } from './mockData';

// API response interface matching the backend structure
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

const API_URL = process.env.API_URL || 'http://localhost:3001';

/**
 * Fetches premium salons from the API
 * @param location Optional location filter
 * @returns Array of salons transformed to match the UI structure
 */
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
        lat: 52.2297 + (index * 0.1),
        lng: 21.0122 + (index * 0.1),
      },
    }));
  } catch (error) {
    console.error('Error fetching premium salons:', error);
    // Return empty array on error to prevent page crash
    return [];
  }
}

/**
 * Generates a URL-friendly slug from a string
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
