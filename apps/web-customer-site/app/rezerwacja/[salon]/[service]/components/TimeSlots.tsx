"use client";

import { Card, CardContent, Badge, Button } from "@repo/ui/components";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import type { TimeSlot } from "../types";

interface TimeSlotsProps {
  slots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot;
}

export function TimeSlots({
  slots,
  onSlotSelect,
  selectedSlot,
}: TimeSlotsProps) {
  const daysOfWeek = ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
  const today = new Date("2026-02-16");

  return (
    <Card className="border-2">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Wybierz datę i godzinę</h3>

          {/* Date Selection */}
          <div className="grid grid-cols-6 gap-2 mb-6 pb-6 border-b">
            {[0, 1, 2, 3, 4, 5].map((dayOffset) => {
              const date = new Date(today);
              date.setDate(date.getDate() + dayOffset);
              const dayNum = date.getDate();
              const dayOfWeek = daysOfWeek[date.getDay()];

              return (
                <button
                  key={dayOffset}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border-2 border-gray-300 hover:border-green-600 transition"
                >
                  <span className="text-xs font-semibold text-gray-600">
                    {dayOfWeek}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {dayNum}
                  </span>
                  <span className="text-xs text-gray-500">
                    {date.toLocaleDateString("pl-PL", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSlotSelect(slot)}
                disabled={!slot.available}
                className={`
                  p-3 rounded-lg font-semibold transition
                  ${
                    !slot.available
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedSlot?.id === slot.id
                        ? "bg-green-600 text-white border-2 border-green-600"
                        : "bg-white border-2 border-gray-300 hover:border-green-600 text-gray-900"
                  }
                `}
              >
                {slot.time}
                {!slot.available && (
                  <span className="block text-xs font-normal">Brak miejsc</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info Alert */}
        <div className="flex gap-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Informacja</p>
            <p className="text-sm text-blue-800">
              Dostępne sloty pokazane na liście. Zarezerwuj szybko, miejsca się
              zapełniają!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
