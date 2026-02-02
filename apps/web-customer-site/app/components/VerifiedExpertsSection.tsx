import { ExpertCard } from "./molecules/ExpertCard";
import { Typography } from "@repo/ui/components";
import type { Expert } from "../lib/experts.mock";

interface VerifiedExpertsSectionProps {
  experts: Expert[];
}

export function VerifiedExpertsSection({
  experts,
}: VerifiedExpertsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <Typography
            variant="h2"
            className="text-3xl lg:text-4xl font-serif font-bold"
          >
            Zweryfikowani Eksperci
          </Typography>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    </section>
  );
}
