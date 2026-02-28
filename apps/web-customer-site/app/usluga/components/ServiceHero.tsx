import Image from "next/image";
import { Button } from "@repo/ui/components";

type ServiceHeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  portfolioText: string;
};

export function ServiceHero({
  title = "Makijaż Permanentny w Twojej okolicy",
  subtitle = "Odkryj luksusowe usługi kosmetyczne i zarezerwuj wizytę u najlepszych artystów w Polsce.",
  ctaText = "Eksploruj usługi",
  portfolioText = "Portfolio artystów",
}: ServiceHeroProps) {
  return (
    <section className="container mx-auto px-4 pt-6 pb-2">
      <div className="relative w-full overflow-hidden rounded-2xl min-h-[360px] lg:min-h-[420px]">
        {/* Background photo */}
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
          alt="Premium Beauty Experience"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a]/85 via-[#1f4d35]/75 to-[#1a3a2a]/85" />

        {/* Decorative leaf overlay - left */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-right mix-blend-soft-light"
            sizes="33vw"
            aria-hidden="true"
          />
        </div>

        {/* Decorative leaf overlay - right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-left mix-blend-soft-light scale-x-[-1]"
            sizes="33vw"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto px-6">
            {/* Premium Badge */}
            <p className="mb-4 text-sm lg:text-base font-semibold italic text-amber-400 tracking-wide">
              Premium Beauty Experience
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-gray-300 mb-8 lg:mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg px-8 py-3.5 h-auto shadow-lg"
              >
                {ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold rounded-lg px-8 py-3.5 h-auto"
              >
                {portfolioText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
