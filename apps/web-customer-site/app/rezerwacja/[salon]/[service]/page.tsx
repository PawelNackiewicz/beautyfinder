"use client";

import { useState } from "react";
import { SiteHeader } from "components";
import {
  SalonHeader,
  SalonDescription,
  SpecialistSection,
  ServiceInfo,
  TimeSlots,
  BookingCard,
  ReviewsList,
} from "./components";
import {
  mockSalon,
  mockService,
  mockSpecialist,
  mockTimeSlots,
  mockCertifications,
  mockReviews,
} from "./mocks";
import type { TimeSlot } from "./types";

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />

      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Salon Header & Description */}
            <SalonHeader salon={mockSalon} />

            <div className="bg-white rounded-lg p-6">
              <SalonDescription description={mockSalon.description} />
            </div>

            {/* Service Info */}
            <ServiceInfo service={mockService} />

            {/* Specialist Section */}
            <SpecialistSection
              specialist={mockSpecialist}
              certifications={mockCertifications}
            />

            {/* Reviews */}
            <ReviewsList reviews={mockReviews} />
          </div>

          {/* Right Column - Sticky Booking */}
          <div className="col-span-1">
            {/* Time Slots */}
            <TimeSlots
              slots={mockTimeSlots}
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
            />

            {/* Booking Card */}
            <div className="mt-6">
              <BookingCard
                service={mockService}
                selectedSlot={selectedSlot?.time}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
