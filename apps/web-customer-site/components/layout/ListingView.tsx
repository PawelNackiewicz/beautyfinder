import React from "react";
import { SALONS, Salon } from "app/lib/mockData";
import { TabsList, TabsTrigger } from "@repo/ui/components";
import { SalonCard } from "components";

interface ListViewProps {
  salons?: Salon[];
  mapSalons?: Salon[];
  title?: string;
  subtitle?: string;
}

export const ListingView = ({
  salons = SALONS,
  title = "Najlepsze salony dla Ciebie",
  subtitle,
}: ListViewProps) => {
  const displaySubtitle =
    subtitle || `Odkryj ${salons.length} polecanych miejsc w Twojej okolicy`;

  return (
    <section id="listing" className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-1">{displaySubtitle}</p>
          </div>

          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 h-auto">
            <TabsTrigger value="list" className="px-4 py-2 rounded-lg gap-2">
              <i className="fa-solid fa-list-ul"></i>
              <span>Lista</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="px-4 py-2 rounded-lg gap-2">
              <i className="fa-solid fa-map"></i>
              <span>Mapa</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </div>
    </section>
  );
};
