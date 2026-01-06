"use client"
import { Search, MapPin } from "lucide-react";
import { Button } from "@repo/ui/components";
import { FormEvent, useState } from "react";

export const HeroSection = () => {
  const [service, setService] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
<section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/45 z-10"></div>
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105" // slight scale to prevent edge flickering
          poster="https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        >
          <source 
            src="https://player.vimeo.com/external/453162796.sd.mp4?s=34a5840d4a9657b960a0c4f800885145df052a6a&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          Twoja przeglądarka nie wspiera formatu wideo.
        </video>
      </div>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
          Twoje piękno <br className="hidden md:block" /> 
          <span className="text-white/90 font-light italic">w dobrych rękach.</span>
        </h1>

        <form 
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-md p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto"
        >
          <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <i className="fa-solid fa-magnifying-glass text-[#2D5A27]"></i>
            <input 
              type="text" 
              placeholder="Usługa (np. Fryzjer, Masaż)" 
              className="w-full focus:outline-none text-gray-800 bg-transparent placeholder-gray-400 font-medium"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-6 py-4 w-full">
            <i className="fa-solid fa-location-dot text-[#2D5A27]"></i>
            <input 
              type="text" 
              placeholder="Miasto" 
              className="w-full focus:outline-none text-gray-800 bg-transparent placeholder-gray-400 font-medium"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-[#2D5A27] text-white px-10 py-4 rounded-xl md:rounded-full font-bold hover:bg-[#23471e] transition-all w-full md:w-auto shadow-lg active:scale-95"
          >
            Szukaj
          </button>
        </form>
        
        <p className="text-white/80 mt-6 text-sm font-medium hidden md:block">
          Popularne: <span className="underline cursor-pointer ml-1">Manicure</span>, <span className="underline cursor-pointer ml-1">Botoks</span>, <span className="underline cursor-pointer ml-1">Strzyżenie męskie</span>
        </p>
      </div>
    </section>
  );
};
