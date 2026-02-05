import { Salon, SALONS } from "app/lib/mockData";
import { FeatureSection, SalonCard } from "components";
import React from "react";

type PremiumSalonsSectionProps = {
  salons?: Salon[];
  mapSalons?: Salon[];
  title?: string;
  subtitle?: string;
};

export const PremiumSalonsSection = ({
  salons = SALONS,
}: PremiumSalonsSectionProps) => {
  return (
    <FeatureSection
      title="Polecane Salony Premium"
      description="Odkryj nasze starannie wyselekcjonowane salony premium, które oferują wyjątkowe doświadczenia i najwyższą jakość usług"
      className="bg-primary/20"
    >
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12">
          {salons.slice(0, 6).map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </div>
    </FeatureSection>
  );
};
