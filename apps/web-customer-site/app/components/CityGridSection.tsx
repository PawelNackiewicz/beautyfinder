import Link from "next/link";
import { CITIES } from "../lib/mockData";
import Image from "next/image";
import { FeatureSection } from "./layout";

export const CityGridSection = () => {
  return (
    <FeatureSection
      title="Znajdź salony w swoim mieście"
      description="Wybierz swoje miasto i odkryj najlepsze salony piękności w okolicy."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CITIES.map((city) => (
          <Link
            href={`/${city.slug}`}
            key={city.id}
            className="group relative h-48 md:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all block"
          >
            <Image
              src={city.imageUrl}
              alt={city.name}
              width={"800"}
              height={"600"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold tracking-tight drop-shadow-md">
                {city.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </FeatureSection>
  );
};
