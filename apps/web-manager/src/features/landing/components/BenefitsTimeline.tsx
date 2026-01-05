import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sun, Clock, Coffee, Moon, Check } from "lucide-react";

const timelineSteps = [
  {
    time: "7:00",
    icon: Sun,
    title: "Poranne przygotowania",
    description:
      "Przejrzyj harmonogram dnia w mgnieniu oka. Beaution wysyła automatyczne przypomnienia do wszystkich klientów.",
    benefits: [
      "Automatyczne przypomnienia SMS",
      "Gotowe grafiki personelu",
      "Zero niestawiennictw",
    ],
  },
  {
    time: "10:00",
    icon: Clock,
    title: "Godziny szczytu",
    description:
      "Zarządzaj klientami bez rezerwacji płynnie, jednocześnie utrzymując wizyty na właściwym torze dzięki aktualizacjom w czasie rzeczywistym.",
    benefits: [
      "Dostępność na żywo",
      "Szybkie zameldowania",
      "Koordynacja wielu pracowników",
    ],
  },
  {
    time: "14:00",
    icon: Coffee,
    title: "Popołudniowy rytm",
    description:
      "Przetwarzaj płatności natychmiast, wysyłaj paragony i pozwól klientom umówić się ponownie zanim wyjdą.",
    benefits: [
      "Płatności jednym kliknięciem",
      "Natychmiastowa rezerwacja",
      "Sugestie dodatkowych usług",
    ],
  },
  {
    time: "18:00",
    icon: Moon,
    title: "Czas zamknięcia",
    description:
      "Przejrzyj przychody dnia, wyślij wiadomości z podziękowaniami i pozwól na wysłanie przypomnień na jutro.",
    benefits: [
      "Raporty dzienne",
      "Automatyczne e-maile z podziękowaniami",
      "Przygotowanie na następny dzień",
    ],
  },
];

export const BenefitsTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-24 bg-secondary/30">
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
            Jak to działa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Dzień w Twoim przekształconym salonie
          </h2>
          <p className="text-muted-foreground">
            Zobacz, jak Beaution usprawnia każdy moment Twojego dnia pracy, od
            otwarcia do zamknięcia.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 md:-translate-x-2 z-10" />

              {/* Content card */}
              <div
                className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
              >
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                  {/* Time badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
                    <step.icon className="w-4 h-4" />
                    {step.time}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-2">
                    {step.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
