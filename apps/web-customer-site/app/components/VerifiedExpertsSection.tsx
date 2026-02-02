import { ExpertCard } from "./molecules/ExpertCard";
import { Typography } from "@repo/ui/components";
import type { Expert } from "../lib/experts.mock";
import { FeatureSection } from "./layout";

interface VerifiedExpertsSectionProps {
  experts: Expert[];
}

export function VerifiedExpertsSection({
  experts,
}: VerifiedExpertsSectionProps) {
  return (
    <FeatureSection
      title="Zweryfikowani Eksperci"
      description="Poznaj naszych najlepszych specjalistów, którzy zdobyli zaufanie klientów dzięki swojej wiedzy i doświadczeniu."
    >
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    </FeatureSection>
  );
}
