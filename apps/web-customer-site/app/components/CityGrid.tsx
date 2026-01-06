"use client"
export const CITIES = [
  { name: 'Warszawa', imageUrl: 'https://picsum.photos/seed/warsaw/800/600' },
  { name: 'Kraków', imageUrl: 'https://picsum.photos/seed/krakow/800/600' },
  { name: 'Wrocław', imageUrl: 'https://picsum.photos/seed/wroclaw/800/600' },
  { name: 'Poznań', imageUrl: 'https://picsum.photos/seed/poznan/800/600' },
  { name: 'Gdańsk', imageUrl: 'https://picsum.photos/seed/gdansk/800/600' },
];

const CityGrid = () => {
 return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Gdzie szukasz piękna?</h2>
        <p className="text-gray-500 mb-12">Najlepsi specjaliści w największych miastach Polski</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CITIES.map((city) => (
            <div 
              key={city.name}
              className="group relative h-48 md:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
            >
              <img 
                src={city.imageUrl} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold tracking-tight drop-shadow-md">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityGrid;
