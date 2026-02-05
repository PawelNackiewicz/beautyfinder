import type { ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Typography } from "@repo/ui/components";

interface FeatureSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const FeatureSection = ({
  title,
  description,
  children,
  className = "",
}: FeatureSectionProps) => {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <Typography variant="h2" className="font-serif mb-4">
            {title}
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto">
            {description}
          </Typography>
        </div>
        {children}
      </div>
    </section>
  );
};
