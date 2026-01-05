import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components";

const faqs = [
  {
    question: "Jak długo trwa darmowy okres próbny?",
    answer:
      "Nasz darmowy okres próbny trwa 14 dni i daje pełny dostęp do wszystkich funkcji planu Professional. Nie wymagamy karty kredytowej na start.",
  },
  {
    question: "Czy mogę później zmienić plan?",
    answer:
      "Oczywiście! Możesz w każdej chwili zmienić plan na wyższy lub niższy. Zmiany wchodzą w życie na początku następnego cyklu rozliczeniowego.",
  },
  {
    question: "Czy moje dane są bezpieczne?",
    answer:
      "Tak, poważnie traktujemy bezpieczeństwo. Wszystkie dane są szyfrowane podczas przesyłania i przechowywania. Jesteśmy zgodni z RODO i nigdy nie sprzedajemy Twoich danych stronom trzecim.",
  },
  {
    question: "Czy oferujecie szkolenia?",
    answer:
      "Zapewniamy kompleksowe wdrożenie dla wszystkich nowych klientów, w tym samouczki wideo, webinary na żywo i dedykowane wsparcie w pierwszym miesiącu.",
  },
  {
    question: "Czy mogę zaimportować istniejące dane klientów?",
    answer:
      "Tak! Obsługujemy import danych z najpopularniejszych programów dla salonów i arkuszy kalkulacyjnych. Nasz zespół może pomóc Ci w migracji za darmo.",
  },
  {
    question: "Jakie metody płatności akceptujecie?",
    answer:
      "Akceptujemy wszystkie główne karty kredytowe (Visa, Mastercard, American Express), a także możemy skonfigurować fakturowanie dla planów rocznych.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 bg-background">
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
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Najczęściej zadawane pytania
          </h2>
          <p className="text-muted-foreground">
            Masz pytania? Mamy odpowiedzi. Nie możesz znaleźć tego, czego
            szukasz? Skontaktuj się z naszym zespołem wsparcia.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
