import React from "react";
import { SALONS, Salon } from "../lib/mockData";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components";
import { SalonMap } from "./SalonMap";
import { SalonCard } from "./molecules/SalonCard";
import Image from "next/image";

interface ListViewProps {
  salons?: Salon[];
  mapSalons?: Salon[];
  title?: string;
  subtitle?: string;
}

const ListingView = ({
  salons = SALONS,
  mapSalons,
  title = "Najlepsze salony dla Ciebie",
  subtitle,
}: ListViewProps) => {
  const displaySubtitle =
    subtitle || `Odkryj ${salons.length} polecanych miejsc w Twojej okolicy`;
  const salonsForMap = mapSalons || salons;

  return (
    <section id="listing" className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <Tabs defaultValue="list" className="w-full">
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

          <TabsContent value="list" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {salons.slice(0, 6).map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <div className="flex flex-col lg:flex-row h-[700px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="w-full lg:w-1/3 overflow-y-auto custom-scrollbar p-6 bg-white border-r border-gray-100">
                <div className="space-y-6">
                  {salons.map((salon) => (
                    <div
                      key={salon.id}
                      className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                    >
                      <Image
                        src={salon.imageUrl}
                        className="w-24 h-24 object-cover rounded-lg"
                        alt={salon.name}
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 line-clamp-1">
                          {salon.name}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 my-1">
                          <i className="fa-solid fa-star"></i>
                          <span className="font-bold text-gray-900">
                            {salon.rating}
                          </span>
                          <span className="text-gray-400">
                            ({salon.reviews})
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          <i className="fa-solid fa-location-dot mr-1"></i>{" "}
                          {salon.location}
                        </p>
                        <Link href={`/${salon.slug}`}>
                          <button className="mt-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                            Szczegóły
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right Map */}
              <div className="flex-1 relative">
                <SalonMap
                  salons={salonsForMap}
                  zoom={6}
                  center={[52.0693, 19.4803]}
                  className="rounded-r-3xl"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ListingView;
