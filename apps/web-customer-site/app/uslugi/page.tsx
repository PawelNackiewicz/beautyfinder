import { SERVICES } from "../lib/mockData";
import Link from "next/link";
import { StandardPageLayout } from "components";

export default function ServicesIndexPage() {
  return (
    <StandardPageLayout>
      <h1 className="text-4xl font-serif font-bold mb-4">Kategorie usług</h1>
      <p className="text-muted-foreground mb-8">
        Wybierz kategorię, aby znaleźć salony oferujące daną usługę.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            href={`/uslugi/${service.id}`}
            className="p-6 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all"
          >
            <h2 className="text-xl font-semibold mb-1">{service.name}</h2>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </Link>
        ))}
      </div>
    </StandardPageLayout>
  );
}
