import type { LastMinuteSlot } from "../lib/last-minute-slots.mock";
import { LastSlotCard } from "./LastSlotCard";
import { Typography } from "@repo/ui/components";

interface LastMinuteSlotsSectionProps {
  slots: LastMinuteSlot[];
}

export const LastMinuteSlotsSection = ({
  slots,
}: LastMinuteSlotsSectionProps) => {
  if (!slots || slots.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Typography variant="h2" className="font-serif mb-4">
            Ostatnie wolne terminy na dziś
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto">
            Zarezerwuj teraz i ciesz się ekskluzywną zniżką
          </Typography>
        </div>

        {/* Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {slots.map((slot) => (
            <LastSlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
};
