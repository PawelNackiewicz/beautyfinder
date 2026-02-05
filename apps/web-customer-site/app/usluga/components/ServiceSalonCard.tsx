import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge, Button } from "@repo/ui/components";
import type { ServiceSalon } from "../mockData";

interface ServiceSalonCardProps {
  salon: ServiceSalon;
}

export function ServiceSalonCard({ salon }: ServiceSalonCardProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <Image
          src={salon.imageUrl}
          alt={salon.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Name + Premium */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {salon.name}
            </h3>
            {salon.isPremium && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-amber-600 text-amber-700 uppercase font-semibold tracking-wide"
              >
                Premium
              </Badge>
            )}
          </div>

          {/* City + Distance */}
          <p className="text-xs text-gray-500 mt-0.5">
            {salon.city} • {salon.distance}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-gray-900">
              {salon.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({salon.reviewCount} opinii)
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-gray-900">
            od {salon.priceFrom} {salon.currency}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-3 uppercase font-semibold tracking-wide"
            asChild
          >
            <Link href={`/${salon.slug}`}>Rezerwuj</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
