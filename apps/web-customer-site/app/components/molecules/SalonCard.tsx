import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button, Card, CardContent, CardFooter } from "@repo/ui/components";

interface SalonCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  lastVisit?: string;
  slug: string;
}

export function SalonCard({
  id,
  name,
  imageUrl,
  rating,
  reviewCount,
  lastVisit,
  slug,
}: SalonCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${name} - wnętrze salonu`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-col gap-3">
        {/* Salon Name */}
        <Link href={`/salons/${slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)} ({reviewCount}{" "}
            {reviewCount === 1
              ? "recenzja"
              : reviewCount < 5
                ? "recenzje"
                : "recenzji"}
            )
          </span>
        </div>

        {/* Last Visit */}
        {lastVisit && (
          <p className="text-sm text-gray-600">Ostatnia wizyta: {lastVisit}</p>
        )}
      </CardContent>

      {/* CTA Button */}
      <CardFooter>
        <Button asChild>
          <Link href={`/salons/${slug}/book`}>Umów Ponownie</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
