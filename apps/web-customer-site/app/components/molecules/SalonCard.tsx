import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@repo/ui/components";
import type { Salon } from "../../lib/mockData";

interface SalonCardProps {
  salon: Salon & { lastVisit?: string };
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all group border-gray-100 p-0 gap-0">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={salon.imageUrl}
          alt={salon.name}
          width={"800"}
          height={"600"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
          <i className="fa-solid fa-star text-yellow-500"></i>
          <span className="font-bold text-gray-900">{salon.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge>{salon.category}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
          {salon.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-gray-500 mb-6">
          <i className="fa-solid fa-location-dot text-[#2D5A27]"></i>
          <span className="text-sm">{salon.location}</span>
        </CardDescription>
        <div className="flex items-center justify-between border-t border-gray-50 pt-6">
          <Button asChild variant="link">
            <Link href={`/${salon.slug}`}>Szczegóły</Link>
          </Button>
          <Button>Zarezerwuj</Button>
        </div>
      </CardContent>
    </Card>
  );
}
