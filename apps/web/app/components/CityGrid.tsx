"use client"
const cities = [
  {
    id: "warszawa",
    name: "Warszawa",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80",
  },
  {
    id: "krakow",
    name: "Kraków",
    image: "https://images.unsplash.com/photo-1599057833088-8ef2d35a9b84?w=600&q=80",
  },
  {
    id: "wroclaw",
    name: "Wrocław",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
  },
  {
    id: "poznan",
    name: "Poznań",
    image: "https://images.unsplash.com/photo-1590330823851-1e6b8d0e8a9c?w=600&q=80",
  },
  {
    id: "gdansk",
    name: "Gdańsk",
    image: "https://images.unsplash.com/photo-1607427293702-036707e53cfd?w=600&q=80",
  },
];

const CityGrid = () => {
  const handleCityClick = (cityId: string) => {
  };

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center text-foreground mb-4">
          Popularne miasta
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Odkryj salony beauty w największych miastach Polski
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {cities.map((city, index) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.id)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-serif font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {city.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityGrid;
