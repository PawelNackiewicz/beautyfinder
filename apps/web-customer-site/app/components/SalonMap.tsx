'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToStaticMarkup } from 'react-dom/server';
import { Scissors, Sparkles, Eye, Heart, Hand, User, MapPin } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fryzjer: Scissors,
  paznokcie: Hand,
  makijaz: Eye,
  kosmetyczka: Sparkles,
  masaz: Heart,
  barber: User,
};

const getCategoryIcon = (category: string) => {
  const IconComponent = CATEGORY_ICONS[category.toLowerCase()] || MapPin;
  return <IconComponent size={20} color="white" />;
};

const createCustomIcon = (category: string = 'default') => {
  const iconMarkup = renderToStaticMarkup(getCategoryIcon(category));
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background-color: var(--primary);
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
      ">
        ${iconMarkup}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

export interface SalonLocation {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  slug: string;
  category?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SalonMapProps {
  salons: SalonLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMarkerClick?: (salon: SalonLocation) => void;
}

export const SalonMap = ({
  salons,
  center,
  zoom = 6,
  className = '',
  onMarkerClick,
}: SalonMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // Calculate center based on salons if not provided
  const mapCenter: [number, number] = center || (() => {
    if (salons.length === 0) return [52.0693, 19.4803]; // Center of Poland
    
    const avgLat = salons.reduce((sum, salon) => sum + salon.coordinates.lat, 0) / salons.length;
    const avgLng = salons.reduce((sum, salon) => sum + salon.coordinates.lng, 0) / salons.length;
    
    return [avgLat, avgLng];
  })();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="fa-solid fa-location-crosshairs text-3xl text-primary"></i>
          </div>
          <p className="text-gray-600 font-medium">Ładowanie mapy...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={true}
      className={`w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapAdjuster salons={salons} />

      {salons.map((salon) => (
        <Marker
          key={salon.id}
          position={[salon.coordinates.lat, salon.coordinates.lng]}
          icon={createCustomIcon(salon.category)}
          eventHandlers={{
            click: () => {
              if (onMarkerClick) {
                onMarkerClick(salon);
              }
            },
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <img
                src={salon.imageUrl}
                alt={salon.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold text-gray-900 mb-1">{salon.name}</h3>
              <div className="flex items-center gap-1 text-sm text-yellow-500 mb-2">
                <i className="fa-solid fa-star"></i>
                <span className="font-bold text-gray-900">{salon.rating}</span>
                <span className="text-gray-400">({salon.reviews})</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                <i className="fa-solid fa-location-dot mr-1"></i>
                {salon.location}
              </p>
              <a
                href={`/${salon.slug}`}
                className="text-xs font-bold text-primary uppercase tracking-wider hover:underline"
              >
                Szczegóły →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Component to handle auto-zoom
const MapAdjuster = ({ salons }: { salons: SalonLocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (salons.length === 0) return;

    try {
      const bounds = L.latLngBounds(salons.map(s => [s.coordinates.lat, s.coordinates.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    } catch (e) {
      console.warn("Could not fit bounds", e);
    }
  }, [salons, map]);

  return null;
};
