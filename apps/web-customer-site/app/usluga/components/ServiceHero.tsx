import Image from "next/image";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  portfolioText: string;
}

export function ServiceHero({
  title = "Makijaż Permanentny w Twojej okolicy",
  subtitle = "Odkryj luksusowe usługi kosmetyczne i zarezerwuj wizytę u najlepszych artystów w Polsce.",
  ctaText = "Eksploruj usługi",
  portfolioText = "Portfolio artystów",
}: ServiceHeroProps) {
  return (
    <section className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Beauty Experience"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Premium Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs lg:text-sm font-medium text-yellow-400 tracking-wider uppercase">
                Premium Beauty Experience
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-gray-200 mb-8 lg:mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl">
                {ctaText}
              </button>
              <button className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white transition-colors">
                {portfolioText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
