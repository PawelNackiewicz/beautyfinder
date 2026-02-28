"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Skeleton, Badge } from "@repo/ui/components";
import type { ServiceSalon } from "../mockData";

type SalonMapProps = {
  salons: ServiceSalon[];
  selectedSalonId?: string;
  onSalonSelect?: (salonId: string) => void;
};

export function SalonMap({
  salons,
  selectedSalonId,
  onSalonSelect,
}: SalonMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [MapComponents, setMapComponents] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    (async () => {
      const [rl, leaflet] = await Promise.all([
        import("react-leaflet"),
        import("leaflet"),
      ]);

      // Inject Leaflet CSS via link tag if not already present
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        L: leaflet.default ?? leaflet,
      });
    })();
  }, []);

  if (!MapComponents) {
    return (
      <div className="w-full h-full min-h-125 rounded-lg overflow-hidden border border-gray-200">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = MapComponents;

  // Center map on average of salon coordinates
  const centerLat =
    salons.reduce((sum, s) => sum + s.coordinates.lat, 0) / salons.length;
  const centerLng =
    salons.reduce((sum, s) => sum + s.coordinates.lng, 0) / salons.length;

  const createPriceIcon = (
    price: number,
    currency: string,
    isSelected: boolean,
  ) => {
    const label = currency === "PLN" ? "zł" : currency;
    return L.divIcon({
      className: "custom-price-marker",
      html: `<div style="
        background: ${isSelected ? "#065f46" : "#166534"};
        color: white;
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        border: 2px solid ${isSelected ? "#fbbf24" : "transparent"};
        transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
        transition: all 0.2s;
        cursor: pointer;
      ">${price} ${label}</div>`,
      iconSize: [80, 30],
      iconAnchor: [40, 30],
    });
  };

  return (
    <div className="w-full h-full min-h-125 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {salons.map((salon) => (
          <Marker
            key={salon.id}
            position={[salon.coordinates.lat, salon.coordinates.lng]}
            icon={createPriceIcon(
              salon.priceFrom,
              salon.currency,
              salon.id === selectedSalonId,
            )}
            eventHandlers={{
              click: () => onSalonSelect?.(salon.id),
            }}
          >
            <Popup>
              <div className="min-w-48 p-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {salon.name}
                  </span>
                  {salon.isPremium && (
                    <Badge
                      variant="outline"
                      className="text-[9px] px-1 py-0 border-amber-500 text-amber-600 bg-amber-50"
                    >
                      PREMIUM
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {salon.city} &bull; {salon.distance}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-semibold">{salon.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({salon.reviewCount})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">
                    od {salon.priceFrom} {salon.currency}
                  </span>
                  <Link
                    href={`/${salon.slug}`}
                    className="text-xs font-semibold text-emerald-700 uppercase tracking-wide hover:underline"
                  >
                    Rezerwuj &rarr;
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
