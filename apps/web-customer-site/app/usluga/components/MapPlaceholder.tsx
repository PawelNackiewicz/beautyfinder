import { MapPin } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="w-full h-full min-h-125 bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-gray-400">
      <MapPin className="w-12 h-12 mb-3 stroke-gray-300" />
      <p className="text-sm font-medium text-gray-400">Mapa</p>
      <p className="text-xs text-gray-300 mt-1">Wkrótce dostępna</p>
    </div>
  );
}
