import { notFound } from "next/navigation";
import { CITIES, SALONS } from "../../lib/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StandardPageLayout, ListingView } from "components";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CityListingPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const city = CITIES.find((c) => c.slug === slug);
  if (!city) {
    notFound();
  }

  const citySalons = SALONS.filter((s) => s.citySlug === city.slug);

  return (
    <StandardPageLayout>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Powrót do strony głównej
      </Link>

      <h1 className="text-4xl font-serif font-bold mb-4 capitalize">
        Salony w: {city.name}
      </h1>

      <ListingView
        salons={citySalons}
        title={`Najlepsze salony - ${city.name}`}
        subtitle={`Znaleziono ${citySalons.length} salonów w tym mieście`}
      />
    </StandardPageLayout>
  );
}
