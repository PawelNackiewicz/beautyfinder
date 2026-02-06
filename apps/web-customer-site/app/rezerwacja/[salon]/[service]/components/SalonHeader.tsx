"use client";

import Image from "next/image";
import {
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components";
import { Star } from "lucide-react";
import type { Salon } from "../types";

interface SalonHeaderProps {
  salon: Salon;
}

export function SalonHeader({ salon }: SalonHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Hero Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-200">
        <Image
          src={salon.image}
          alt={salon.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Salon Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{salon.name}</h1>
            <p className="text-gray-600 mt-1">{salon.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{salon.rating}</span>
              <span className="text-sm text-gray-600">
                ({salon.reviewCount} opinii)
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-900">Adres</p>
            <p>{salon.address}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Telefon</p>
            <p>{salon.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
