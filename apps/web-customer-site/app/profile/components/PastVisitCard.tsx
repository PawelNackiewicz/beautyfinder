import { Card, CardContent, Button } from "@repo/ui/components";
import Image from "next/image";
import type { PastVisit } from "../types";

interface PastVisitCardProps {
  visit: PastVisit;
}

export function PastVisitCard({ visit }: PastVisitCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Salon Image */}
          <div className="shrink-0">
            <Image
              src={visit.salonImage}
              alt={visit.salonName}
              width={300}
              height={200}
              className="w-16 h-16 rounded-lg object-cover bg-gray-200"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-2">
            {/* Header with name and price */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-semibold">{visit.salonName}</h4>
                <p className="text-sm text-gray-600">{visit.serviceName}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-lg font-bold">{visit.price}</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: visit.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Date and Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>📅</span>
                <span>{visit.date}</span>
                <span>🕐</span>
                <span>{visit.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm">
                Zarezerwuj ponownie
              </Button>
              <Button variant="outline" size="sm">
                Oceń wizytę
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
