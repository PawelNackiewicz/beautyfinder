"use client";
import { Scissors, Sparkles, Eye, Heart, Hand, User } from "lucide-react";

const categories = [
  { id: "fryzjer", name: "Fryzjer", icon: Scissors },
  { id: "paznokcie", name: "Paznokcie", icon: Hand },
  { id: "makijaz", name: "Makijaż Permanentny", icon: Eye },
  { id: "kosmetyczka", name: "Kosmetyczka", icon: Sparkles },
  { id: "masaz", name: "Masaż", icon: Heart },
  { id: "barber", name: "Barber", icon: User },
];

export const CategoryTabs = () => {

  const handleCategoryClick = (categoryId: string) => {
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center text-foreground mb-4">
          Wybierz kategorię
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Znajdź idealnego specjalistę w swojej okolicy
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group flex flex-col items-center gap-4 p-6 lg:p-8 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center group-hover:bg-primary/50 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="font-medium text-foreground text-center text-sm lg:text-base">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
