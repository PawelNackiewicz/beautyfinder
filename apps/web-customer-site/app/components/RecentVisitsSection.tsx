import { FeatureSection } from "./layout";
import { SalonCard } from "./molecules";
import type { RecentVisit } from "../lib/recent-visits.mock";

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
    <FeatureSection
      title={`Witamy ponownie, ${customerName}!`}
      description="Oto salony, które ostatnio odwiedziłeś/aś"
      className="bg-primary/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {recentVisits.map((visit) => (
          <SalonCard key={visit.id} salon={visit} />
        ))}
      </div>
    </FeatureSection>
  );
}
