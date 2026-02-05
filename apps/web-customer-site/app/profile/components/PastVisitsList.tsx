import { Typography } from "@repo/ui/components";
import { PastVisitCard } from "./PastVisitCard";
import type { PastVisit } from "../types";

interface PastVisitsListProps {
  visits: PastVisit[];
}

export function PastVisitsList({ visits }: PastVisitsListProps) {
  return (
    <div className="mt-8 w-full">
      <Typography variant="h2" className="mb-6">
        Ostatnie wizyty
      </Typography>

      <div className="space-y-4 w-full">
        {visits.map((visit) => (
          <PastVisitCard key={visit.id} visit={visit} />
        ))}
      </div>
    </div>
  );
}
