"use client"
import React, { useState } from 'react';

export interface Salon {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  city: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Green Velvet Studio',
    category: 'Fryzjer',
    rating: 4.9,
    reviews: 128,
    location: 'ul. Marszałkowska 12, Warszawa',
    city: 'Warszawa',
    imageUrl: 'https://picsum.photos/seed/salon1/400/300',
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: '2',
    name: 'Pure Beauty Lounge',
    category: 'Kosmetyczka',
    rating: 4.8,
    reviews: 95,
    location: 'ul. Floriańska 5, Kraków',
    city: 'Kraków',
    imageUrl: 'https://picsum.photos/seed/salon2/400/300',
    coordinates: { lat: 50.0647, lng: 19.9450 }
  },
  {
    id: '3',
    name: 'Sharp & Clean Barber',
    category: 'Barber',
    rating: 5.0,
    reviews: 210,
    location: 'ul. Świdnicka 44, Wrocław',
    city: 'Wrocław',
    imageUrl: 'https://picsum.photos/seed/salon3/400/300',
    coordinates: { lat: 51.1079, lng: 17.0385 }
  },
  {
    id: '4',
    name: 'Indigo Nails Art',
    category: 'Paznokcie',
    rating: 4.7,
    reviews: 340,
    location: 'ul. Półwiejska 1, Poznań',
    city: 'Poznań',
    imageUrl: 'https://picsum.photos/seed/salon4/400/300',
    coordinates: { lat: 52.4064, lng: 16.9252 }
  },
  {
    id: '5',
    name: 'Ethereal Spa',
    category: 'Masaż',
    rating: 4.9,
    reviews: 72,
    location: 'ul. Długa 10, Gdańsk',
    city: 'Gdańsk',
    imageUrl: 'https://picsum.photos/seed/salon5/400/300',
    coordinates: { lat: 54.3520, lng: 18.6466 }
  }
];


const ListingView = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <section id="listing" className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Najlepsze salony dla Ciebie</h2>
            <p className="text-gray-500 mt-1">Odkryj {MOCK_SALONS   .length} polecanych miejsc w Twojej okolicy</p>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm self-start border border-gray-200">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-[#2D5A27] text-white' : 'text-gray-600'}`}
            >
              <i className="fa-solid fa-list-ul"></i>
              <span>Lista</span>
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'map' ? 'bg-[#2D5A27] text-white' : 'text-gray-600'}`}
            >
              <i className="fa-solid fa-map"></i>
              <span>Mapa</span>
            </button>
          </div>
        </div>  

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {MOCK_SALONS.map(salon => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-[700px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            {/* Left Sidebar List */}
            <div className="w-full lg:w-1/3 overflow-y-auto custom-scrollbar p-6 bg-white border-r border-gray-100">
              <div className="space-y-6">
                {MOCK_SALONS.map(salon => (
                  <div key={salon.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                    <img src={salon.imageUrl} className="w-24 h-24 object-cover rounded-lg" alt={salon.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 line-clamp-1">{salon.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-yellow-500 my-1">
                        <i className="fa-solid fa-star"></i>
                        <span className="font-bold text-gray-900">{salon.rating}</span>
                        <span className="text-gray-400">({salon.reviews})</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate"><i className="fa-solid fa-location-dot mr-1"></i> {salon.location}</p>
                      <button className="mt-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">Szczegóły</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Map Placeholder */}
            <div className="flex-1 bg-gray-200 relative">
               <div className="absolute inset-0 flex items-center justify-center bg-[#f0f4f0]">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <i className="fa-solid fa-location-crosshairs text-3xl text-[#2D5A27]"></i>
                    </div>
                    <p className="text-gray-600 font-medium">Interaktywna Mapa</p>
                    <p className="text-xs text-gray-400 mt-1">Ładowanie markerów dla {salons.length} salonów...</p>
                  </div>
                  {/* Visual Map Mockup: Green Markers */}
                  {MOCK_SALONS.map((s, idx) => (
                    <div 
                      key={s.id} 
                      className="absolute w-8 h-8 bg-[#2D5A27] text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce"
                      style={{ 
                        top: `${20 + (idx * 15)}%`, 
                        left: `${20 + (idx * 12)}%`,
                        animationDelay: `${idx * 0.2}s`
                      }}
                    >
                      <i className="fa-solid fa-spa text-xs"></i>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const SalonCard: React.FC<{ salon: Salon }> = ({ salon }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={salon.imageUrl} 
        alt={salon.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
        <i className="fa-solid fa-star text-yellow-500"></i>
        <span className="font-bold text-gray-900">{salon.rating}</span>
      </div>
      <div className="absolute bottom-4 left-4">
         <span className="bg-[#2D5A27] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
           {salon.category}
         </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{salon.name}</h3>
      <div className="flex items-center gap-2 text-gray-500 mb-6">
        <i className="fa-solid fa-location-dot text-[#2D5A27]"></i>
        <span className="text-sm">{salon.location}</span>
      </div>
      <div className="flex items-center justify-between border-t border-gray-50 pt-6">
        <button className="text-[#2D5A27] font-bold text-sm hover:underline">Szczegóły</button>
        <button className="bg-[#2D5A27] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#23471e] transition-all shadow-md shadow-[#2d5a27]/10">
          Zarezerwuj
        </button>
      </div>
    </div>
  </div>
);

export default ListingView;
