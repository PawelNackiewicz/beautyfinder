import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  Typography,
  CardFooter,
  CardHeader,
} from "@repo/ui/components";
import type { Salon } from "../../app/lib/mockData";

interface SalonCardProps {
  salon: Salon & { lastVisit?: string };
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all p-0">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={salon.imageUrl}
          alt={salon.name}
          width={"800"}
          height={"600"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Button
          className="absolute top-4 right-4"
          variant={"outline"}
          aria-label="Dodaj do ulubionych"
        >
          <Heart className="w-5 h-5 fill-error stroke-error" />
        </Button>
        <div className="absolute top-4 left-4">
          <Badge variant="default" className="uppercase">
            {salon.category}
          </Badge>
        </div>
        <Badge className="absolute bottom-4 left-4 bg-white" variant="outline">
          <Star className="w-4 h-4 fill-warning stroke-warning" />
          <span className="font-semibold text-gray-900">{salon.rating}</span>
          <span className="text-gray-500 text-sm">({salon.reviews})</span>
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{salon.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-6">
        <CardDescription className="">
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <Typography variant="small">{salon.location}</Typography>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full flex justify-between p-6">
        <Button asChild variant="outline">
          <Link href={`/salon/${salon.slug}`}>Szczegóły</Link>
        </Button>
        <Button asChild>
          <Link href={`/rezerwacja/${salon.slug}/service`}>Zarezerwuj</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
