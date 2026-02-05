import { notFound } from "next/navigation";
import { SERVICES, CITIES, SALONS } from "../lib/mockData";
import { Button } from "@repo/ui/components"; // Assuming available
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Clock, Phone } from "lucide-react";
import { StandardPageLayout, ListingView } from "components";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  // 1. Check if it is a Service
  const service = SERVICES.find((s) => s.id === slug);
  if (service) {
    const serviceSalons = SALONS.filter((s) => s.category === service.id);
    return (
      <StandardPageLayout>
        <h1 className="text-4xl font-serif font-bold mb-4 capitalize">
          {service.name}
        </h1>
        <p className="text-muted-foreground mb-8">{service.description}</p>

        <ListingView
          salons={serviceSalons}
          title={`Salony: ${service.name}`}
          subtitle={`Znaleziono ${serviceSalons.length} salonów oferujących tę usługę`}
        />
      </StandardPageLayout>
    );
  }

  // 2. Check if it is a City (Extra feature, but good for UX)
  const city = CITIES.find((c) => c.slug === slug);
  if (city) {
    const citySalons = SALONS.filter((s) => s.citySlug === city.slug);
    return (
      <StandardPageLayout>
        <h1 className="text-4xl font-serif font-bold mb-4 capitalize">
          Salony w: {city.name}
        </h1>
        <ListingView
          salons={citySalons}
          title={`Najlepsze salony - ${city.name}`}
          subtitle={`Znaleziono ${citySalons.length} salonów w tym mieście`}
        />
      </StandardPageLayout>
    );
  }

  // 3. Check if it is a Salon
  const salon = SALONS.find((s) => s.slug === slug);
  if (salon) {
    const categoryName =
      SERVICES.find((s) => s.id === salon.category)?.name || salon.category;

    return (
      <StandardPageLayout>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do strony głównej
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image and Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg">
              <img
                src={salon.imageUrl}
                alt={salon.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#2D5A27] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                  {categoryName}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
                {salon.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{salon.location}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center text-yellow-500 font-bold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {salon.rating} ({salon.reviews} opinii)
                </div>
              </div>

              <div className="prose max-w-none text-muted-foreground">
                <p>
                  Witamy w {salon.name}! Jesteśmy profesjonalnym salonem{" "}
                  {categoryName}, gdzie Twoje piękno jest naszym priorytetem.
                  Nasz zespół to doświadczeni specjaliści, którzy zadbają o Twój
                  wygląd i samopoczucie. Zapraszamy do skorzystania z naszych
                  usług w relaksującej atmosferze.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Umów wizytę</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Godziny otwarcia
                    </p>
                    <p className="text-sm text-gray-600">
                      Pon - Pt: 09:00 - 20:00
                    </p>
                    <p className="text-sm text-gray-600">Sob: 09:00 - 16:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Kontakt</p>
                    <p className="text-sm text-gray-600">+48 123 456 789</p>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                Zarezerwuj termin
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Rezerwacja online jest darmowa i zajmuje tylko chwilę.
              </p>
            </div>
          </div>
        </div>
      </StandardPageLayout>
    );
  }

  // 4. Not Found
  notFound();
}
