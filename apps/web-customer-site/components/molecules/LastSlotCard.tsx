import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
} from "@repo/ui/components";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LastMinuteSlot } from "../../app/lib/last-minute-slots.mock";

interface LastSlotCardProps {
  slot: LastMinuteSlot;
}

export const LastSlotCard = ({ slot }: LastSlotCardProps) => {
  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={slot.imageUrl}
          alt={slot.serviceName}
          width={800}
          height={600}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4">{slot.discount}% OFF</Badge>
      </div>

      <CardHeader>
        <CardTitle>{slot.serviceName}</CardTitle>
        <CardDescription>{slot.salonName}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <Typography variant="small">{slot.displayTime}</Typography>
        </div>

        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <Typography variant="small">{slot.address}</Typography>
        </div>

        <div className="flex items-baseline gap-2 pt-2">
          <Typography variant="h3">€{slot.price}</Typography>
          {slot.discount > 0 && (
            <Typography variant="muted" className="line-through">
              €{slot.originalPrice}
            </Typography>
          )}
        </div>
      </CardContent>

      <CardFooter className="w-full p-6">
        <Link href={`/salon/${slot.salonId}`} className="w-full">
          <Button className="w-full" size="lg">
            Zarezerwuj teraz
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
