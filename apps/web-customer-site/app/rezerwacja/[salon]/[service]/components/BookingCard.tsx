"use client";

import {
  Card,
  CardContent,
  Button,
  Alert,
  AlertDescription,
} from "@repo/ui/components";
import { Lock, AlertTriangle } from "lucide-react";
import type { ServiceDetail } from "../types";

interface BookingCardProps {
  service: ServiceDetail;
  selectedSlot?: string;
  isLoading?: boolean;
}

export function BookingCard({
  service,
  selectedSlot,
  isLoading,
}: BookingCardProps) {
  return (
    <Card className="sticky top-6 border-2">
      <CardContent className="p-6 space-y-4">
        {/* Price Summary */}
        <div className="space-y-3 pb-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{service.name}</span>
            <span className="font-semibold">
              {service.price} {service.currency}
            </span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Razem</span>
            <span className="text-2xl text-green-600">
              {service.price} {service.currency}
            </span>
          </div>
        </div>

        {/* Selected Slot */}
        {selectedSlot && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Wybrana godzina</p>
            <p className="font-semibold text-green-900">{selectedSlot}</p>
          </div>
        )}

        {/* Warning Alert */}
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            Informacja: Alergy i terminy. Niezbędne się być odwiedzony skutkiem
            zapalenia na Gminu Libą.
          </AlertDescription>
        </Alert>

        {/* CTA Button */}
        <Button
          disabled={!selectedSlot || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg h-12"
        >
          {isLoading ? "Przetwarzanie..." : "Zarezerwuj i zapłać na miejscu"}
        </Button>

        {/* Info */}
        <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Bezpieczna rezerwacja
        </p>
      </CardContent>
    </Card>
  );
}
