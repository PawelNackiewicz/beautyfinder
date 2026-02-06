import Image from "next/image";
import Link from "next/link";
import { Typography } from "@repo/ui/components";
import { PortfolioImage } from "../types";

interface PortfolioSectionProps {
  images: PortfolioImage[];
}

export function PortfolioSection({ images }: PortfolioSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h2">Ostatnie metamorfozy</Typography>
        <Link
          href="#"
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors uppercase tracking-wide"
        >
          Zobacz wszystko
        </Link>
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
              width={image.width}
              height={image.height}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
