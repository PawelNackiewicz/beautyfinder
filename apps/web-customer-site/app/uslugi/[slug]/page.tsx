import { notFound } from "next/navigation";
import { SERVICES, SALONS } from "../../lib/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StandardPageLayout, ListingView } from "components";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceListingPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const service = SERVICES.find((s) => s.id === slug);
  if (!service) {
    notFound();
  }

  const serviceSalons = SALONS.filter((s) => s.category === service.id);

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
        {service.name}
      </h1>
      <p className="text-muted-foreground mb-8">{service.description}</p>

      <ListingView
        salons={serviceSalons}
        title={`Salony: ${service.name}`}
        subtitle={`Znaleziono ${serviceSalons.length} salonów oferujących tę usługę`}
      />
    </StandardPageLayout>
  );
}
