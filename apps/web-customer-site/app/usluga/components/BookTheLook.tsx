import Image from "next/image";

type BookTheLookProps = {
  images: string[];
  categoryName?: string;
};

export function BookTheLook({
  images,
  categoryName = "Brwi pudrowe",
}: BookTheLookProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Book the Look: {categoryName}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`${categoryName} look ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
