import Link from "next/link";
import { Button } from "@repo/ui/components";
import { MapPin, ArrowRight } from "lucide-react";

export const AddSalonCTA = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12 lg:p-16 text-primary-foreground">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Prowadzisz salon beauty?
                </h2>
                <p className="mt-2 text-primary-foreground/80 text-base md:text-lg">
                  Dodaj swój salon do naszej mapy za darmo i zacznij przyjmować
                  rezerwacje od tysięcy klientów.
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="shrink-0 text-base font-semibold px-8"
            >
              <Link href="/dodaj-salon">
                Dodaj salon za darmo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-foreground/5" />
        </div>
      </div>
    </section>
  );
};
