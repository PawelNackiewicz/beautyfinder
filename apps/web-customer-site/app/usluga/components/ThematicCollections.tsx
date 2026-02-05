import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/components";
import type { ThematicCollection } from "../mockData";

interface ThematicCollectionsProps {
  collections: ThematicCollection[];
}

export function ThematicCollections({ collections }: ThematicCollectionsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold italic text-gray-900 mb-6">
          Kolekcje Tematyczne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative rounded-xl overflow-hidden aspect-16/10 group"
            >
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-serif italic font-bold text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-sm text-white/80 mb-4 max-w-xs">
                  {collection.description}
                </p>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-500 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300"
                    asChild
                  >
                    <Link href={`/kolekcja/${collection.slug}`}>
                      Zobacz kolekcję
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
