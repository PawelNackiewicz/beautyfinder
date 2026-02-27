import {
  Card,
  CardContent,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@repo/ui/components";
import Image from "next/image";
import type { Appointment } from "../types";

interface UpcomingAppointmentCardProps {
  appointment: Appointment;
}

export function UpcomingAppointmentCard({
  appointment,
}: UpcomingAppointmentCardProps) {
  return (
    <Card className="border border-primary">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Salon Image */}
          <div className="shrink-0">
            <Image
              src={appointment.salonImage}
              alt={appointment.salonName}
              width={300}
              height={200}
              className="w-20 h-20 rounded-lg object-cover bg-gray-200"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-3">
            {/* Header with name and price */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {appointment.salonName}
                </h3>
                <p className="text-sm text-gray-600">
                  {appointment.serviceName}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xl font-bold">{appointment.price}</span>
                <Badge variant="secondary">{appointment.status}</Badge>
              </div>
            </div>

            {/* Date and Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span>📅</span>
                <span>{appointment.date}</span>
                <span>🕐</span>
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📍</span>
                <span>{appointment.address}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Stylist Info and Actions */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="/placeholder-stylist.jpg"
                    alt={appointment.stylistName}
                  />
                  <AvatarFallback>
                    {appointment.stylistName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {appointment.stylistName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {appointment.stylistRole}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Przenieś rezerwację
                </Button>
                <Button variant="outline" size="sm">
                  Anuluj
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
