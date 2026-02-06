import Image from "next/image";
import { MapPin, Star, UserCheck } from "lucide-react";
import { Badge, Button, Typography } from "@repo/ui/components";
import { SalonDetail } from "../types";

interface HeroSectionProps {
  salon: SalonDetail;
}

export function HeroSection({ salon }: HeroSectionProps) {
  return (
    <section className="relative h-[60vh] min-h-100">
      <Image
        src={salon.heroImage}
        alt={salon.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex items-start justify-between">
            <div>
              {salon.badge && (
                <Badge variant="default" className="mb-3">
                  ⭐ {salon.badge}
                </Badge>
              )}
              <Typography variant="h1" className="text-white mb-2">
                {salon.name}
              </Typography>
              <Typography variant="lead" className="text-white/90">
                {salon.tagline}
              </Typography>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <Typography variant="large" className="text-white">
                    {salon.rating}
                  </Typography>
                  <Typography variant="muted" className="text-white/80">
                    ({salon.reviewCount} ocen)
                  </Typography>
                </div>
                <div className="flex items-center gap-1">
                  <UserCheck className="w-5 h-5" />
                  <Typography variant="small" className="text-white">
                    {salon.verifiedCount}+ zrealizowanych wizyt
                  </Typography>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <Typography variant="small" className="text-white">
                    {salon.distance} km od Ciebie
                  </Typography>
                </div>
              </div>
            </div>

            <Button variant="cta" size="lg">
              Zarezerwuj wizytę
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
