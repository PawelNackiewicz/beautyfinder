"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components";
import { ChevronDown } from "lucide-react";

interface SalonDescriptionProps {
  description: string;
}

export function SalonDescription({ description }: SalonDescriptionProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center gap-2 py-4 text-lg font-semibold hover:text-gray-700">
        Opis zabiegu
        <ChevronDown className="w-5 h-5" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 py-4 text-gray-700 leading-relaxed">
          <p>
            Masaż relaksacyjny całego ciała korzysta z naszych tradycyjnych
            technik. Procedura 60-minutowej sesji uwalnia stres ze wszystkich
            obszarach ciała, wykorzystując techniki głębokie usług, oraz
            naturalne olejki aromaterapii. Zabiegi nie będą mozliwości niespanie
            migrene, ale tasłe upokajają umysł i poprawiają samopoczucie.
          </p>
          <p>
            Zabiegi wytrawnym jest w specjalnej klimatyzowanej atmosferze, z
            wykorzystaniem najwyższej jakości produktów naturalnych. Idealni do
            osób poszukujących relaksu, zmęczonych się ze stresem lub po prostu
            pragmatycznych relaksu.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
