import { SlidersHorizontal } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SERVICE_SALONS,
  TOP_ARTISTS,
  BOOK_THE_LOOK_IMAGES,
  THEMATIC_COLLECTIONS,
} from "../mockData";
import {
  ServiceHero,
  ServiceCategoryTabs,
  ServiceSalonCard,
  MapPlaceholder,
  TopArtists,
  BookTheLook,
  ThematicCollections,
} from "../components";

export default function UslugaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ServiceHero
        title="Makijaż Permanentny w Twojej okolicy"
        subtitle="Odkryj luksusowe usługi kosmetyczne i zarezerwuj wizytę u najlepszych artystów w Polsce."
        ctaText="Eksploruj usługi"
        portfolioText="Portfolio artystów"
      />

      {/* Category filter tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <ServiceCategoryTabs
            categories={SERVICE_CATEGORIES}
            activeId="brwi-pudrowe"
          />
        </div>
      </div>

      {/* Main content: List + Map */}
      <div className="container mx-auto px-4">
        <div className="flex gap-0 lg:gap-6">
          {/* Left panel — salon list */}
          <div className="w-full lg:w-105 shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between py-4">
              <h1 className="text-lg font-bold text-gray-900">
                Najbliżej Ciebie
              </h1>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <span>Filtry</span>
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Salon list */}
            <div className="divide-y divide-gray-200">
              {SERVICE_SALONS.map((salon) => (
                <ServiceSalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          </div>

          {/* Right panel — map placeholder */}
          <div className="hidden lg:block flex-1 py-4 sticky top-14.25 h-[calc(100vh-57px)]">
            <MapPlaceholder />
          </div>
        </div>
      </div>

      {/* Topowi Artyści */}
      <TopArtists artists={TOP_ARTISTS} />

      {/* Book the Look */}
      <BookTheLook images={BOOK_THE_LOOK_IMAGES} categoryName="Brwi pudrowe" />

      {/* Kolekcje Tematyczne */}
      <ThematicCollections collections={THEMATIC_COLLECTIONS} />
    </div>
  );
}
