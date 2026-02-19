"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Switch,
  Label,
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
import { Settings, Lightbulb } from "lucide-react";
import { useEffect, useCallback } from "react";
import {
  operationalSchema,
  type OperationalForm,
  CANCELLATION_POLICIES,
  DAYS_OF_WEEK,
  DEFAULT_OPERATIONAL,
} from "../schemas/registration";
import { useFormPersistence } from "../hooks/useFormPersistence";

type OperationalStepProps = {
  onNext: (data: OperationalForm) => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export function OperationalStep({
  onNext,
  onBack,
  isSubmitting,
}: OperationalStepProps) {
  const { getStepData, saveStepData, isHydrated } =
    useFormPersistence<OperationalForm>("operational", DEFAULT_OPERATIONAL);

  const form = useForm<OperationalForm>({
    resolver: zodResolver(operationalSchema),
    defaultValues: DEFAULT_OPERATIONAL,
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

  const onSubmit = (data: OperationalForm) => {
    saveStepData(data);
    onNext(data);
  };

  if (!isHydrated) return null;

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Ustawienia Operacyjne</h2>
            <p className="text-sm text-muted-foreground">
              Godziny pracy i zasady rezerwacji
            </p>
          </div>
        </div>

        {/* Working Hours Table */}
        <div>
          <FormLabel>
            Dni i godziny otwarcia <span className="text-destructive">*</span>
          </FormLabel>
          <div className="mt-3 rounded-lg border overflow-hidden">
            <div className="grid grid-cols-4 gap-4 bg-muted/50 px-4 py-3 text-sm font-medium">
              <span>Dzień</span>
              <span>Status</span>
              <span>Otwarcie</span>
              <span>Zamknięcie</span>
            </div>

            {DAYS_OF_WEEK.map(({ key, label }) => {
              const dayKey = key as keyof OperationalForm["workingHours"];
              const isOpen = form.watch(`workingHours.${dayKey}.open`);

              return (
                <div
                  key={key}
                  className="grid grid-cols-4 gap-4 items-center px-4 py-3 border-t"
                >
                  <span className="text-sm font-medium">{label}</span>

                  <FormField
                    control={form.control as any}
                    name={`workingHours.${dayKey}.open`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (!checked) {
                                form.setValue(
                                  `workingHours.${dayKey}.start`,
                                  null,
                                );
                                form.setValue(
                                  `workingHours.${dayKey}.end`,
                                  null,
                                );
                              } else {
                                form.setValue(
                                  `workingHours.${dayKey}.start`,
                                  "09:00",
                                );
                                form.setValue(
                                  `workingHours.${dayKey}.end`,
                                  "18:00",
                                );
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as any}
                    name={`workingHours.${dayKey}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            disabled={!isOpen}
                            className="w-full"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.value || null)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as any}
                    name={`workingHours.${dayKey}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            disabled={!isOpen}
                            className="w-full"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.value || null)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Break */}
        <div>
          <Label className="text-base font-medium">Przerwa techniczna</Label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <FormField
              control={form.control as any}
              name="technicalBreak.start"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="--:--"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const current = form.getValues("technicalBreak");
                          form.setValue("technicalBreak", {
                            start: val,
                            end: current?.end || "",
                          });
                        } else {
                          form.setValue("technicalBreak", null);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="technicalBreak.end"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="--:--"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const current = form.getValues("technicalBreak");
                          form.setValue("technicalBreak", {
                            start: current?.start || "",
                            end: val,
                          });
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Np. przerwa obiadowa 13:00-14:00
          </p>
        </div>

        {/* Station Count */}
        <FormField
          control={form.control as any}
          name="stationCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Liczba stanowisk <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Ile osób może być obsługiwanych jednocześnie
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cancellation Policy */}
        <FormField
          control={form.control as any}
          name="cancellationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Polityka odwołań <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz politykę" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CANCELLATION_POLICIES.map((policy) => (
                    <SelectItem key={policy.value} value={policy.value}>
                      {policy.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tip */}
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-100 p-4">
          <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Wskazówka</p>
            <p className="text-sm text-amber-800">
              Elastyczna polityka odwołań zwiększa liczbę rezerwacji o 35%.
              Klienci chętniej rezerwują, gdy wiedzą, że mogą zmienić plany.
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            ← Poprzedni krok
          </Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Wysyłanie..." : "Zapisz i kontynuuj →"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
