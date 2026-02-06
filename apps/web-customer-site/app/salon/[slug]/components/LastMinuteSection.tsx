import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Typography,
} from "@repo/ui/components";
import { LastMinuteDeal } from "../types";

interface LastMinuteSectionProps {
  deals: LastMinuteDeal[];
}

export function LastMinuteSection({ deals }: LastMinuteSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h2" className="mb-2">
            Okazje Last Minute
          </Typography>
          <Typography variant="muted">
            Dostępne dzisiaj i jutro z rabatem
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Typography variant="muted">{deal.day}</Typography>
                  <Typography variant="h3">{deal.time}</Typography>
                </div>
                <Badge
                  variant="default"
                  className="bg-emerald-500 text-white border-0"
                >
                  -{deal.discount}%
                </Badge>
              </div>

              <Typography variant="large" className="mb-1">
                {deal.serviceName}
              </Typography>
              <Typography variant="muted" className="mb-3">
                z {deal.staffName}
              </Typography>

              <div className="flex items-baseline gap-2">
                <Typography variant="small" className="line-through opacity-50">
                  €{deal.originalPrice}
                </Typography>
                <Typography variant="h3">€{deal.discountedPrice}</Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
