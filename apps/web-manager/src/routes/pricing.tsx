import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Badge } from "@/components";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "99",
      period: "mies",
      description: "Idealny dla małych salonów rozpoczynających przygodę",
      badge: null,
      features: [
        "Do 2 stanowisk pracy",
        "100 wizyt miesięcznie",
        "Podstawowy kalendarz",
        "Baza klientów",
        "Zarządzanie usługami",
        "Wsparcie email",
      ],
      cta: "Rozpocznij",
      variant: "outline" as const,
    },
    {
      name: "Professional",
      price: "249",
      period: "mies",
      description: "Najpopularniejszy wybór dla rozwijających się salonów",
      badge: "Najpopularniejszy",
      features: [
        "Do 5 stanowisk pracy",
        "500 wizyt miesięcznie",
        "Zaawansowany kalendarz",
        "Pełny CRM klientów",
        "Zarządzanie magazynem",
        "Raporty i analityka",
        "SMS przypomnienia",
        "Wsparcie priorytetowe",
      ],
      cta: "Rozpocznij 14-dniowy trial",
      variant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "449",
      period: "mies",
      description: "Dla dużych salonów z wieloma lokalizacjami",
      badge: null,
      features: [
        "Nielimitowane stanowiska",
        "Nielimitowane wizyty",
        "Multi-lokalizacja",
        "Zaawansowana analityka",
        "API i integracje",
        "Dedykowany opiekun konta",
        "Szkolenia dla zespołu",
        "Wsparcie 24/7",
      ],
      cta: "Skontaktuj się",
      variant: "outline" as const,
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
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Funkcje
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-primary">
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
          Prosty i przejrzysty
          <br />
          <span className="text-primary">cennik</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Wybierz plan dopasowany do wielkości Twojego salonu. Bez ukrytych
          kosztów, zawsze możesz zmienić plan.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg border bg-card flex flex-col ${
                plan.badge ? "ring-2 ring-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.badge && (
                <Badge className="w-fit mb-4" variant="default">
                  {plan.badge}
                </Badge>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">
                  zł/{plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/login" className="w-full">
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Najczęściej zadawane pytania
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">
                Czy mogę zmienić plan w dowolnym momencie?
              </h3>
              <p className="text-muted-foreground">
                Tak, możesz upgradować lub downgradować swój plan w każdej
                chwili. Zmiany wchodzą w życie natychmiast, a rozliczenia są
                proporcjonalne.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Czy jest okres próbny?</h3>
              <p className="text-muted-foreground">
                Wszystkie plany oferują 14-dniowy darmowy okres próbny. Nie
                potrzebujesz karty kredytowej, aby rozpocząć.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">
                Co się stanie, jeśli przekroczę limity?
              </h3>
              <p className="text-muted-foreground">
                Skontaktujemy się z Tobą i pomożemy wybrać odpowiedni plan. Nie
                blokujemy dostępu do systemu bez uprzedzenia.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Czy dane są bezpieczne?</h3>
              <p className="text-muted-foreground">
                Tak, wszystkie dane są szyfrowane i przechowywane zgodnie z RODO
                na serwerach w UE. Wykonujemy codzienne backupy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto p-12 rounded-lg border bg-card">
          <h2 className="text-3xl font-bold mb-4">
            Masz pytania dotyczące planu?
          </h2>
          <p className="text-muted-foreground mb-8">
            Nasz zespół pomoże Ci wybrać najlepszy plan dla Twojego salonu
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Skontaktuj się z nami
            </Button>
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
