import { SalonCard } from "./molecules";

interface RecentVisit {
  id: string;
  salonId: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  lastVisit: string;
  slug: string;
}

interface RecentVisitsSectionProps {
  customerName: string;
  recentVisits: RecentVisit[];
}

export function RecentVisitsSection({
  customerName,
  recentVisits,
}: RecentVisitsSectionProps) {
  // Don't render if no recent visits
  if (recentVisits.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
            Witaj ponownie, {customerName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Twoje ulubione miejsca są tylko kliknięcie od Ciebie
          </p>
        </div>

        {/* Salon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentVisits.map((visit) => (
            <SalonCard
              key={visit.id}
              id={visit.salonId}
              name={visit.name}
              imageUrl={visit.imageUrl}
              rating={visit.rating}
              reviewCount={visit.reviewCount}
              lastVisit={visit.lastVisit}
              slug={visit.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
