import { notFound } from "next/navigation";
import { SERVICES, CITIES, SALONS } from "../../../lib/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ListingView, StandardPageLayout } from "components";

interface PageProps {
  params: Promise<{
    slug: string;
    city: string;
  }>;
}

export default async function ServiceCityListingPage(props: PageProps) {
  const params = await props.params;
  const { slug, city: cityParam } = params;

  const service = SERVICES.find((s) => s.id === slug);
  const city = CITIES.find((c) => c.slug === cityParam);

  if (!service || !city) {
    notFound();
  }

  const filteredSalons = SALONS.filter(
    (s) => s.category === service.id && s.citySlug === city.slug,
  );

  return (
    <StandardPageLayout>
      <Link
        href={`/uslugi/${slug}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Wróć do {service.name}
      </Link>

      <h1 className="text-4xl font-serif font-bold mb-4 capitalize">
        {service.name} w mieście {city.name}
      </h1>
      <p className="text-muted-foreground mb-8">
        Najlepsi specjaliści ({service.name.toLowerCase()}) w lokalizacji{" "}
        {city.name}.
      </p>

      <ListingView
        salons={filteredSalons}
        title={`Salony: ${service.name} - ${city.name}`}
        subtitle={
          filteredSalons.length > 0
            ? `Znaleziono ${filteredSalons.length} salonów`
            : "Brak salonów spełniających kryteria"
        }
      />
    </StandardPageLayout>
  );
}
