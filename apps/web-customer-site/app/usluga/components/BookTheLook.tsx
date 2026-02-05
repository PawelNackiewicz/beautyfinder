import Image from "next/image";

interface BookTheLookProps {
  images: string[];
  categoryName?: string;
}

export function BookTheLook({
  images,
  categoryName = "Brwi pudrowe",
}: BookTheLookProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Book the Look: {categoryName}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`${categoryName} look ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
