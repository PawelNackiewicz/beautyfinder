import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
  Typography,
} from "@repo/ui/components";
import { ServiceCategory } from "../types";

interface ServicesSectionProps {
  categories: ServiceCategory[];
}

export function ServicesSection({ categories }: ServicesSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Typography variant="h2" className="mb-2 italic">
          Nasze Usługi
        </Typography>
        <Typography variant="muted">Pełna oferta zabiegów beauty</Typography>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-base">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg">
                  {category.icon}
                </span>
                <Typography variant="large">{category.name}</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-0">
                {category.services.map((service, idx) => (
                  <div key={service.id}>
                    <div className="flex items-center justify-between py-3 px-4">
                      <div>
                        <Typography variant="p">{service.name}</Typography>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="size-3.5 text-muted-foreground" />
                          <Typography variant="muted">
                            {service.duration}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Typography variant="large">
                          €{service.price}
                        </Typography>
                        <Button variant="outline" size="sm">
                          Zarezerwuj
                        </Button>
                      </div>
                    </div>
                    {idx < category.services.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
