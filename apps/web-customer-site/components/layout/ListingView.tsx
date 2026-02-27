"use client";

import React, { useState } from "react";
import { SALONS, Salon } from "app/lib/mockData";
import { List, Map } from "lucide-react";
import { SalonCard } from "components";

interface ListViewProps {
  salons?: Salon[];
  title?: string;
  subtitle?: string;
}

export const ListingView = ({
  salons = SALONS,
  title = "Najlepsze salony dla Ciebie",
  subtitle,
}: ListViewProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
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

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Lista</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Mapa</span>
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500">
            Widok mapy — wkrótce dostępny
          </div>
        )}
      </div>
    </section>
  );
};
