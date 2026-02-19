import type { Metadata } from "next";
import { SiteHeader, Footer } from "components";
import { SalonRegistrationForm } from "./components/SalonRegistrationForm";

export const metadata: Metadata = {
  title: "Dodaj swój salon do Beautyfinder | Bezpłatne zgłoszenie",
  description:
    "Zgłoś swój salon do platformy Beautyfinder i zacznij przyjmować rezerwacje online. Bezpłatna rejestracja.",
};

export default function DodajSalonPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold tracking-tight">
            Dodaj swój salon do Beautyfinder BE
          </h1>
          <p className="mt-2 text-muted-foreground">
            Wypełnij poniższe informacje, aby rozpocząć przyjmowanie rezerwacji
          </p>
        </div>

        <SalonRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
