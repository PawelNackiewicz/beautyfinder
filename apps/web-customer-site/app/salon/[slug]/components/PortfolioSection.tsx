import Image from "next/image";
import { Typography } from "@repo/ui/components";
import { PortfolioImage } from "../types";

interface PortfolioSectionProps {
  images: PortfolioImage[];
}

export function PortfolioSection({ images }: PortfolioSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Typography variant="h2" className="mb-2">
          Nasze Realizacje
        </Typography>
        <Typography variant="muted">Zobacz oferty naszej pracy</Typography>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
