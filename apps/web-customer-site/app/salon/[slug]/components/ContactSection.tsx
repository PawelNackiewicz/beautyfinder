import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button, Card, CardContent, Typography } from "@repo/ui/components";
import { SalonContact } from "../types";

interface ContactSectionProps {
  contact: SalonContact;
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Typography variant="h2" className="mb-2 italic">
          Kontakt
        </Typography>
        <Typography variant="muted">Znajdź nas i umów się na wizytę</Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="size-5" />
              </div>
              <div>
                <Typography variant="large">Adres</Typography>
                <Typography variant="muted">{contact.address}</Typography>
                <Typography variant="muted">
                  {contact.postalCode} {contact.city}, {contact.country}
                </Typography>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Phone className="size-5" />
              </div>
              <div>
                <Typography variant="large">Telefon</Typography>
                <Typography variant="muted">{contact.phone}</Typography>
                <Typography variant="muted" className="text-xs">
                  {contact.openingHours[0]?.days}:{" "}
                  {contact.openingHours[0]?.hours},{" "}
                  {contact.openingHours[1]?.days}:{" "}
                  {contact.openingHours[1]?.hours}
                </Typography>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mail className="size-5" />
              </div>
              <div>
                <Typography variant="large">Email</Typography>
                <Typography variant="muted">{contact.email}</Typography>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Clock className="size-5" />
              </div>
              <div>
                <Typography variant="large">Godziny otwarcia</Typography>
                {contact.openingHours.map((hours) => (
                  <Typography key={hours.days} variant="muted">
                    {hours.days}: {hours.hours}
                  </Typography>
                ))}
              </div>
            </div>

            <Button variant="cta" size="lg" className="w-full">
              Zarezerwuj wizytę online
            </Button>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <div className="relative rounded-lg overflow-hidden bg-muted min-h-100">
          <Image
            src={contact.mapImageUrl}
            alt="Lokalizacja salonu na mapie"
            fill
            className="object-cover opacity-70"
          />
          {/* Map pin overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="size-32 rounded-full border-4 border-background/80 bg-background/20 backdrop-blur-sm" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <MapPin className="size-8 text-destructive fill-destructive" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
