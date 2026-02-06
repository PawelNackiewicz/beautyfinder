"use client";

import { Card, CardContent, Badge, Button } from "@repo/ui/components";
import { Clock, MapPin } from "lucide-react";
import type { ServiceDetail } from "../types";

interface ServiceInfoProps {
  service: ServiceDetail;
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
          <p className="text-gray-700 mt-1">{service.description}</p>
        </div>

        <div className="flex items-center gap-6 py-4 border-t border-b border-green-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-700" />
            <div>
              <p className="text-sm text-gray-600">Czas</p>
              <p className="font-semibold text-green-900">
                {service.duration} min
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cena</p>
            <p className="text-2xl font-bold text-green-900">
              {service.price} {service.currency}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700">
          ✓ Obowiązkowa rejestracja do rezerwacji
        </p>
      </CardContent>
    </Card>
  );
}
