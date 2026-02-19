"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components";
import { MapPin } from "lucide-react";
import { useEffect, useCallback, useState, useRef } from "react";
import {
  locationSchema,
  type LocationForm,
  DEFAULT_LOCATION,
} from "../schemas/registration";
import { useFormPersistence } from "../hooks/useFormPersistence";

type LocationStepProps = {
  onNext: (data: LocationForm) => void;
  onBack: () => void;
};

export function LocationStep({ onNext, onBack }: LocationStepProps) {
  const { getStepData, saveStepData, isHydrated } =
    useFormPersistence<LocationForm>("location", DEFAULT_LOCATION);

  const form = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: DEFAULT_LOCATION,
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Hydrate form from localStorage
  useEffect(() => {
    if (isHydrated) {
      const stored = getStepData();
      form.reset(stored);
    }
  }, [isHydrated, getStepData, form]);

  // Auto-save on change
  const watchAll = form.watch();
  const saveData = useCallback(() => {
    saveStepData(form.getValues());
  }, [saveStepData, form]);

  useEffect(() => {
    saveData();
  }, [watchAll, saveData]);

  // Initialize Leaflet map
  useEffect(() => {
    if (!isHydrated || !mapRef.current || mapLoaded) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      // @ts-expect-error CSS import has no type declarations
      await import("leaflet/dist/leaflet.css");

      const lat = form.getValues("latitude") || 52.2297;
      const lng = form.getValues("longitude") || 21.0122;

      const map = L.map(mapRef.current!, {
        center: [lat, lng],
        zoom: 13,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const customIcon = L.divIcon({
        html: `<div style="background: #166534; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        className: "",
      });

      const marker = L.marker([lat, lng], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        form.setValue("latitude", Number(pos.lat.toFixed(8)), {
          shouldValidate: true,
        });
        form.setValue("longitude", Number(pos.lng.toFixed(8)), {
          shouldValidate: true,
        });
      });

      map.on("click", (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        form.setValue("latitude", Number(e.latlng.lat.toFixed(8)), {
          shouldValidate: true,
        });
        form.setValue("longitude", Number(e.latlng.lng.toFixed(8)), {
          shouldValidate: true,
        });
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setMapLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
        setMapLoaded(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");

  const onSubmit = (data: LocationForm) => {
    saveStepData(data);
    onNext(data);
  };

  if (!isHydrated) return null;

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Lokalizacja</h2>
            <p className="text-sm text-muted-foreground">
              Adres i dane kontaktowe salonu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <FormField
              control={form.control as any}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ulica i numer <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Np. ul. Marszałkowska 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control as any}
            name="floorUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Piętro / Lokal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Np. 2 piętro, lokal 5"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control as any}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kod pocztowy <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="00-000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Miasto <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Warszawa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>
            Lokalizacja GPS <span className="text-destructive">*</span>
          </FormLabel>
          <div
            ref={mapRef}
            className="mt-2 h-[250px] w-full rounded-lg border overflow-hidden"
          />
          <div className="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
            <p>Przeciągnij pin, aby dokładnie wskazać lokalizację</p>
            <p className="font-medium">
              {latitude?.toFixed(4)}° N, {longitude?.toFixed(4)}° E
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control as any}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Publiczny numer telefonu{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="+48 123 456 789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail do rezerwacji{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="rezerwacje@salon.pl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control as any}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strona WWW</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.twojsalon.pl"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            ← Poprzedni krok
          </Button>
          <Button type="submit" size="lg">
            Zapisz i kontynuuj →
          </Button>
        </div>
      </form>
    </Form>
  );
}
