import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LastMinuteSlot } from "../lib/last-minute-slots.mock";

interface LastSlotCardProps {
  slot: LastMinuteSlot;
}

export const LastSlotCard = ({ slot }: LastSlotCardProps) => {
  return (
    <Card className="group overflow-hidden p-0 hover:shadow-xl transition-shadow duration-300">
      {/* Image with discount badge */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={slot.imageUrl}
          alt={slot.serviceName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {slot.discount}% OFF
        </div>
      </div>

      <CardHeader>
        <CardTitle>{slot.serviceName}</CardTitle>
        <CardDescription>{slot.salonName}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Time */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <Typography variant="small">{slot.displayTime}</Typography>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <Typography variant="small">{slot.address}</Typography>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <Typography variant="h3">€{slot.price}</Typography>
          {slot.discount > 0 && (
            <Typography variant="muted" className="line-through">
              €{slot.originalPrice}
            </Typography>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/salon/${slot.salonId}`} className="w-full">
          <Button className="w-full" size="lg">
            Zarezerwuj teraz
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
