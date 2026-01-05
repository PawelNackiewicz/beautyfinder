import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Users,
  CreditCard,
  BarChart3,
  Bell,
  Palette,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Inteligentne planowanie",
    description:
      "Intuicyjny kalendarz z funkcją przeciągnij i upuść, automatycznymi przypomnieniami i aktualizacjami dostępności w czasie rzeczywistym.",
  },
  {
    icon: Users,
    title: "Zarządzanie klientami",
    description:
      "Kompletne profile klientów z historią wizyt, preferencjami i spersonalizowanymi notatkami.",
  },
  {
    icon: CreditCard,
    title: "Płynne płatności",
    description:
      "Akceptuj wszystkie metody płatności dzięki zintegrowanemu systemowi POS, fakturowaniu i automatycznym paragonom.",
  },
  {
    icon: BarChart3,
    title: "Panel analityczny",
    description:
      "Śledź przychody, godziny szczytu, najpopularniejsze usługi i wydajność personelu na pierwszy rzut oka.",
  },
  {
    icon: Bell,
    title: "Zautomatyzowany marketing",
    description:
      "Inteligentne kampanie e-mail i SMS z okazji urodzin, promocji i reaktywacji klientów.",
  },
  {
    icon: Palette,
    title: "Własny branding",
    description:
      "Strony rezerwacji white-label, które pasują do unikalnego stylu i tożsamości Twojego salonu.",
  },
];

export const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 bg-background">
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
            Funkcje
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Wszystko, czego potrzebujesz do prowadzenia salonu
          </h2>
          <p className="text-muted-foreground">
            Potężne narzędzia zaprojektowane specjalnie dla profesjonalistów
            beauty, aby oszczędzać czas, redukować niestawiennictwa i rozwijać
            biznes.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
