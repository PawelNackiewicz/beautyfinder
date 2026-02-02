import type { LastMinuteSlot } from "../lib/last-minute-slots.mock";
import { LastSlotCard } from "./molecules/LastSlotCard";
import { FeatureSection } from "./layout";

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
    <FeatureSection
      title="Ostatnie wolne terminy na dziś"
      description="Zarezerwuj teraz i ciesz się ekskluzywną zniżką"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {slots.map((slot) => (
          <LastSlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </FeatureSection>
  );
};
