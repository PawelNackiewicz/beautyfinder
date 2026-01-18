"use client"
import { Search, MapPin } from "lucide-react";
import { Button, Input, Typography } from "@repo/ui/components";
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
        >
          <source 
            src="/hero_video.mp4" 
            type="video/mp4" 
          />
          Twoja przeglądarka nie wspiera formatu wideo.
        </video>
      </div>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl flex flex-col items-center">
        <div className="mb-8 drop-shadow-2xl">
          <Typography variant="h1" className="text-white tracking-tight">
            Twoje piękno <br className="hidden md:block" /> 
            <span className="text-white/90 font-light italic">w dobrych rękach.</span>
          </Typography>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-background/95 backdrop-blur-md p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl w-full mx-auto"
        >
          <div className="flex-1 flex items-center gap-3 px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <Search className="text-primary size-5" />
            <Input 
              type="text" 
              placeholder="Usługa (np. Fryzjer, Masaż)" 
              className="border-none shadow-none focus-visible:ring-0 px-0 h-auto text-base placeholder:text-muted-foreground bg-transparent"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-6 py-2 w-full">
            <MapPin className="text-primary size-5" />
             <Input 
              type="text" 
              placeholder="Miasto" 
              className="border-none shadow-none focus-visible:ring-0 px-0 h-auto text-base placeholder:text-muted-foreground bg-transparent"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <Button 
            type="submit"
            variant="default"
            className="w-full md:w-auto rounded-xl md:rounded-full"
          >
            Szukaj
          </Button>
        </form>
        
        <div className="mt-6 hidden md:block">
           <Typography variant="small" className="text-white/80 font-medium">
            Popularne: 
            <Button variant="link" className="text-white/80 hover:text-white px-1 h-auto font-normal underline decoration-1 underline-offset-4">Manicure</Button>, 
            <Button variant="link" className="text-white/80 hover:text-white px-1 h-auto font-normal underline decoration-1 underline-offset-4">Botoks</Button>, 
            <Button variant="link" className="text-white/80 hover:text-white px-1 h-auto font-normal underline decoration-1 underline-offset-4">Strzyżenie męskie</Button>
          </Typography>
        </div>
      </div>
    </section>
  );
};
