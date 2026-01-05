import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components";

export const Route = createFileRoute("/functions")({
  component: FunctionsPage,
});

function FunctionsPage() {
  const features = [
    {
      icon: "📅",
      title: "Kalendarz wizyt",
      description:
        "Pełna kontrola nad harmonogramem salonu. Zarządzaj wizytami, przypisuj pracowników i śledź dostępność w czasie rzeczywistym.",
      benefits: [
        "Widok dzienny, tygodniowy i miesięczny",
        "Automatyczne przypomnienia SMS/Email",
        "Zarządzanie dostępnością pracowników",
        "Rezerwacje online dla klientów",
      ],
    },
    {
      icon: "👥",
      title: "Baza klientów",
      description:
        "Kompletny CRM zaprojektowany dla salonów kosmetycznych. Historia wizyt, preferencje i notatki w jednym miejscu.",
      benefits: [
        "Karty klientów z pełną historią",
        "Preferencje i alergeny",
        "Notatki i zdjęcia przed/po",
        "Programy lojalnościowe",
      ],
    },
    {
      icon: "💼",
      title: "Zarządzanie usługami",
      description:
        "Katalog usług z cenami, czasem trwania i wymaganymi produktami. Łatwe dodawanie i edycja oferty.",
      benefits: [
        "Elastyczne cenniki",
        "Pakiety i promocje",
        "Przypisanie do pracowników",
        "Zarządzanie czasem trwania",
      ],
    },
    {
      icon: "📦",
      title: "Magazyn i inwentaryzacja",
      description:
        "Kontroluj stany magazynowe produktów i kosmetyków. Otrzymuj powiadomienia o niskich stanach.",
      benefits: [
        "Automatyczne śledzenie stanów",
        "Powiadomienia o niskich stanach",
        "Historia zamówień",
        "Koszty i marże produktów",
      ],
    },
    {
      icon: "👔",
      title: "Zarządzanie pracownikami",
      description:
        "Grafiki, uprawnienia, prowizje i statystyki dla każdego pracownika. Pełna kontrola nad zespołem.",
      benefits: [
        "Grafiki i urlopy",
        "System prowizji",
        "Uprawnienia i role",
        "Statystyki wydajności",
      ],
    },
    {
      icon: "📊",
      title: "Raporty i analityka",
      description:
        "Szczegółowe raporty finansowe i operacyjne. Podejmuj decyzje w oparciu o dane.",
      benefits: [
        "Raporty finansowe",
        "Statystyki sprzedaży",
        "Analiza popularności usług",
        "Eksport do Excel/PDF",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Beaution Manager
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/functions"
              className="text-sm font-medium text-primary"
            >
              Funkcje
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Cennik
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Kontakt
            </Link>
            <Link to="/login">
              <Button variant="default">Zaloguj się</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Wszystko czego potrzebujesz
          <br />
          <span className="text-primary">w jednym miejscu</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Kompleksowe narzędzie do zarządzania każdym aspektem Twojego salonu
          kosmetycznego
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto p-12 rounded-lg border bg-card">
          <h2 className="text-3xl font-bold mb-4">
            Gotowy na start?
          </h2>
          <p className="text-muted-foreground mb-8">
            Dołącz do setek zadowolonych salonów, które już korzystają z
            Beaution Manager
          </p>
          <Link to="/login">
            <Button size="lg">Rozpocznij za darmo</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2025 Beaution Manager. Wszystkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}










