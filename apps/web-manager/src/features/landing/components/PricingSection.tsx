import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@repo/ui/components";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Idealny dla samodzielnych stylistów i małych zespołów",
    price: 29,
    period: "/miesiąc",
    features: [
      "Do 3 członków zespołu",
      "Nieograniczone wizyty",
      "Podstawowe zarządzanie klientami",
      "Przypomnienia e-mail",
      "Strona rezerwacji online",
      "Przetwarzanie płatności",
    ],
    cta: "Rozpocznij darmowy okres",
    popular: false,
  },
  {
    name: "Professional",
    description: "Idealny dla rozwijających się salonów",
    price: 79,
    period: "/miesiąc",
    features: [
      "Do 10 członków zespołu",
      "Wszystko ze Starter",
      "Przypomnienia SMS",
      "Zaawansowane analizy",
      "Automatyzacja marketingu",
      "Własny branding",
      "Priorytetowe wsparcie",
    ],
    cta: "Rozpocznij darmowy okres",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Dla firm z wieloma lokalizacjami",
    price: 199,
    period: "/miesiąc",
    features: [
      "Nieograniczona liczba członków zespołu",
      "Wszystko z Professional",
      "Wsparcie wielu lokalizacji",
      "Dostęp do API",
      "Dedykowany opiekun konta",
      "Niestandardowe integracje",
      "Gwarancja SLA",
    ],
    cta: "Skontaktuj się z działem sprzedaży",
    popular: false,
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Cennik
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Prosty, przejrzysty cennik
          </h2>
          <p className="text-muted-foreground">
            Wybierz plan dopasowany do Twojego salonu. Wszystkie plany zawierają
            14-dniowy darmowy okres próbny.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-dark text-primary-foreground border-2 border-primary scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-cta text-primary-foreground text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Najpopularniejszy
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.popular
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`ml-1 ${
                      plan.popular
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? "text-accent" : "text-primary"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-primary-foreground/90"
                          : "text-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
