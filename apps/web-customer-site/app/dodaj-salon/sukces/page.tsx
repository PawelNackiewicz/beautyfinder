import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, Footer } from "components";
import { Button, Card, CardContent } from "@repo/ui/components";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Salon zgłoszony! | Beautyfinder",
  description:
    "Twój salon został pomyślnie zgłoszony do Beautyfinder. Poinformujemy Cię o statusie weryfikacji.",
};

export default function SalonRegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto flex items-center justify-center px-4 py-16 md:py-24">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold">Salon zgłoszony pomyślnie!</h1>

            <p className="mt-4 text-muted-foreground">
              Twoje zgłoszenie zostało przyjęte i jest w trakcie weryfikacji.
              Poinformujemy Cię e-mailem o zmianie statusu.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Zazwyczaj weryfikacja trwa do 24 godzin roboczych.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/">Wróć na stronę główną</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dodaj-salon">Zgłoś kolejny salon</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
