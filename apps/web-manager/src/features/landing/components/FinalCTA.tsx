import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@repo/ui/components";
import { ArrowRight, Sparkles, Clock } from "lucide-react";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Oferta ograniczona: Zdobądź 20% zniżki na pierwsze 3 miesiące
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Gotowy na przekształcenie swojego salonu?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Dołącz do ponad 2500 właścicieli salonów, którzy już dokonali
            zmiany. Rozpocznij darmowy okres próbny już dziś i zobacz różnicę w
            zaledwie tydzień.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              className="group bg-background text-foreground hover:bg-background/90"
            >
              <Sparkles className="w-5 h-5" />
              Rozpocznij darmowy 14-dniowy okres próbny
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 mt-6">
            Nie wymagamy karty kredytowej • Anuluj w dowolnym momencie • Pełny
            dostęp do funkcji
          </p>
        </motion.div>
      </div>
    </section>
  );
};
