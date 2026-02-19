"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Label,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components";
import {
  Camera,
  Upload,
  ImagePlus,
  Instagram,
  Facebook,
  Wifi,
  Car,
  Wind,
  Accessibility,
  CreditCard,
  Coffee,
  Music,
  Tv,
} from "lucide-react";
import { useEffect, useCallback } from "react";
import {
  presentationSchema,
  type PresentationForm,
  AMENITIES,
  DEFAULT_PRESENTATION,
} from "../schemas/registration";
import { useFormPersistence } from "../hooks/useFormPersistence";

type PresentationStepProps = {
  onNext: (data: PresentationForm) => void;
  onBack: () => void;
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-4 w-4" />,
  Car: <Car className="h-4 w-4" />,
  Wind: <Wind className="h-4 w-4" />,
  Accessibility: <Accessibility className="h-4 w-4" />,
  CreditCard: <CreditCard className="h-4 w-4" />,
  Coffee: <Coffee className="h-4 w-4" />,
  Music: <Music className="h-4 w-4" />,
  Tv: <Tv className="h-4 w-4" />,
};

export function PresentationStep({ onNext, onBack }: PresentationStepProps) {
  const { getStepData, saveStepData, isHydrated } =
    useFormPersistence<PresentationForm>("presentation", DEFAULT_PRESENTATION);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<PresentationForm>({
    resolver: zodResolver(presentationSchema) as any,
    defaultValues: DEFAULT_PRESENTATION,
  });

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

  const selectedAmenities = form.watch("amenities") || [];
  const description = form.watch("description") || "";

  const toggleAmenity = (amenityId: string) => {
    const current = form.getValues("amenities") || [];
    if (current.includes(amenityId)) {
      form.setValue(
        "amenities",
        current.filter((a) => a !== amenityId),
        { shouldValidate: true },
      );
    } else {
      form.setValue("amenities", [...current, amenityId], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: PresentationForm) => {
    saveStepData(data);
    onNext(data);
  };

  if (!isHydrated) return null;

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Prezentacja</h2>
            <p className="text-sm text-muted-foreground">
              Zdjęcia, opis i media społecznościowe
            </p>
          </div>
        </div>

        {/* Cover Photo */}
        <div>
          <FormLabel>
            Zdjęcie główne (Cover) <span className="text-destructive">*</span>
          </FormLabel>
          <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12 transition-colors hover:border-muted-foreground/50">
            <div className="text-center">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Przeciągnij zdjęcie lub kliknij, aby wybrać
              </p>
              <p className="text-xs text-muted-foreground/70">
                Zalecany rozmiar: 1920x1080px, max 5MB
              </p>
            </div>
          </div>
          <FormField
            control={form.control as any}
            name="coverPhotoUrl"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <Input
                    placeholder="Lub wklej URL zdjęcia..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Logo + Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormLabel>
              Logo salonu <span className="text-destructive">*</span>
            </FormLabel>
            <div className="mt-2 flex h-[140px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30">
              <div className="text-center">
                <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground/50" />
                <p className="mt-1 text-xs text-muted-foreground">Dodaj logo</p>
                <p className="text-xs text-muted-foreground/70">
                  PNG/SVG, 500x500px
                </p>
              </div>
            </div>
            <FormField
              control={form.control as any}
              name="logoUrl"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <Input
                      placeholder="Lub wklej URL logo..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>Galeria zdjęć (min. 3)</FormLabel>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-[65px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30"
                >
                  <span className="text-lg text-muted-foreground/50">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <FormField
          control={form.control as any}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pełny opis salonu <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Opisz swój salon, atmosferę, specjalizacje i to, co wyróżnia Was na tle konkurencji..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                {description.length}/150 znaków (minimum 150)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Media */}
        <div>
          <FormLabel className="text-base font-semibold">
            Media społecznościowe
          </FormLabel>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control as any}
              name="socialMedia.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="@twojsalon"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="socialMedia.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="facebook.com/twojsalon"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="socialMedia.tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Music className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="@twojsalon"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <FormLabel className="text-base font-semibold">
            Udogodnienia
          </FormLabel>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {AMENITIES.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity.id);
              return (
                <label
                  key={amenity.id}
                  className="flex items-center gap-2 cursor-pointer rounded-md border p-3 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  {AMENITY_ICONS[amenity.icon]}
                  <span className="text-sm">{amenity.label}</span>
                </label>
              );
            })}
          </div>
        </div>

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
