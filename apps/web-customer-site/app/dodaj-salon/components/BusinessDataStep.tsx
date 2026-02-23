"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Label,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components";
import { Building2 } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import {
  businessDataSchema,
  type BusinessDataForm,
  MAIN_CATEGORIES,
  SUBCATEGORIES,
  DEFAULT_BUSINESS_DATA,
} from "../schemas/registration";
import { useFormPersistence } from "../hooks/useFormPersistence";

type BusinessDataStepProps = {
  onNext: (data: BusinessDataForm) => void;
};

export function BusinessDataStep({ onNext }: BusinessDataStepProps) {
  const { getStepData, saveStepData, isHydrated } =
    useFormPersistence<BusinessDataForm>("businessData", DEFAULT_BUSINESS_DATA);

  const form = useForm<BusinessDataForm>({
    resolver: zodResolver(businessDataSchema),
    defaultValues: DEFAULT_BUSINESS_DATA,
  });

  const [nipVerified, setNipVerified] = useState(false);

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

  const handleNipVerify = () => {
    const nip = form.getValues("nip");
    if (/^\d{10}$/.test(nip)) {
      setNipVerified(true);
    } else {
      form.setError("nip", { message: "NIP musi składać się z 10 cyfr" });
    }
  };

  const selectedSubcategories = form.watch("subcategories");

  const toggleSubcategory = (sub: string) => {
    const current = form.getValues("subcategories");
    if (current.includes(sub)) {
      form.setValue(
        "subcategories",
        current.filter((s) => s !== sub),
        { shouldValidate: true },
      );
    } else {
      form.setValue("subcategories", [...current, sub], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: BusinessDataForm) => {
    saveStepData(data);
    onNext(data);
  };

  if (!isHydrated) return null;

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Dane Biznesowe</h2>
            <p className="text-sm text-muted-foreground">
              Podstawowe informacje o Twoim salonie
            </p>
          </div>
        </div>

        <FormField
          control={form.control as any}
          name="publicName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nazwa publiczna (B2C){" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Np. Elegancja Beauty Studio" {...field} />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Ta nazwa będzie widoczna dla klientów w aplikacji
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control as any}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pełna nazwa firmy <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nazwa zgodna z KRS/CEIDG" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="nip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  NIP <span className="text-destructive">*</span>
                </FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="0000000000" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={handleNipVerify}
                    variant={nipVerified ? "outline" : "default"}
                    size="default"
                    className="shrink-0"
                  >
                    {nipVerified ? "✓ Zweryfikowano" : "Weryfikuj"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control as any}
          name="mainCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kategoria główna <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MAIN_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label className="mb-2 block">
            Podkategorie (wybierz wszystkie pasujące)
          </Label>
          <div className="flex flex-wrap gap-2">
            {SUBCATEGORIES.map((sub) => {
              const isSelected = selectedSubcategories?.includes(sub);
              return (
                <Badge
                  key={sub}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer select-none px-3 py-1.5 text-sm transition-colors"
                  onClick={() => toggleSubcategory(sub)}
                >
                  {isSelected ? "✓ " : "+ "}
                  {sub}
                </Badge>
              );
            })}
          </div>
          {form.formState.errors.subcategories && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.subcategories.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">
            Zapisz i kontynuuj →
          </Button>
        </div>
      </form>
    </Form>
  );
}
