"use client";

import { Card, CardContent, Badge } from "@repo/ui/components";
import { Star } from "lucide-react";
import Image from "next/image";
import type { Specialist } from "../types";

interface SpecialistSectionProps {
  specialist: Specialist;
  certifications: Array<{ title: string; icon: string }>;
}

export function SpecialistSection({
  specialist,
  certifications,
}: SpecialistSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profil Specjalisty</h2>

      {/* Specialist Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <Image
                src={specialist.avatar}
                alt={specialist.name}
                width={120}
                height={120}
                className="w-32 h-32 rounded-full object-cover bg-gray-200"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{specialist.name}</h3>
                <p className="text-gray-600">{specialist.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">
                    {specialist.rating}
                  </span>
                  <span className="text-sm text-gray-600">(187 opinii)</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm">{specialist.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <div>
        <h3 className="font-semibold mb-4">Certyfikaty i kwalifikacje</h3>
        <div className="grid grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="text-2xl">🏅</div>
                <p className="text-sm font-semibold leading-tight">
                  {cert.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
