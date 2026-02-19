"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@repo/ui/components";
import { StepSidebar } from "./StepSidebar";
import { BusinessDataStep } from "./BusinessDataStep";
import { LocationStep } from "./LocationStep";
import { PresentationStep } from "./PresentationStep";
import { OperationalStep } from "./OperationalStep";
import {
  useCurrentStep,
  getFullRegistrationData,
  clearRegistrationData,
} from "../hooks/useFormPersistence";
import type {
  BusinessDataForm,
  LocationForm,
  PresentationForm,
  OperationalForm,
} from "../schemas/registration";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function SalonRegistrationForm() {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useCurrentStep();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const markStepCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]));
  }, []);

  const handleStep1Next = useCallback(
    (_data: BusinessDataForm) => {
      markStepCompleted(1);
      setCurrentStep(2);
    },
    [markStepCompleted, setCurrentStep],
  );

  const handleStep2Next = useCallback(
    (_data: LocationForm) => {
      markStepCompleted(2);
      setCurrentStep(3);
    },
    [markStepCompleted, setCurrentStep],
  );

  const handleStep3Next = useCallback(
    (_data: PresentationForm) => {
      markStepCompleted(3);
      setCurrentStep(4);
    },
    [markStepCompleted, setCurrentStep],
  );

  const handleStep4Next = useCallback(
    async (_data: OperationalForm) => {
      markStepCompleted(4);
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const allData = getFullRegistrationData();
        if (!allData) {
          throw new Error("Brak danych formularza");
        }

        const payload = {
          ...allData.businessData,
          ...allData.location,
          ...allData.presentation,
          ...allData.operational,
        };

        const response = await fetch(`${API_URL}/salon-registrations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || `Błąd serwera: ${response.status}`,
          );
        }

        clearRegistrationData();
        router.push("/dodaj-salon/sukces");
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [markStepCompleted, router],
  );

  const goBack = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    [setCurrentStep],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <StepSidebar currentStep={currentStep} completedSteps={completedSteps} />

      <div className="flex-1 max-w-3xl">
        <Card>
          <CardContent className="p-6 md:p-8">
            {submitError && (
              <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm text-destructive">{submitError}</p>
              </div>
            )}

            {currentStep === 1 && <BusinessDataStep onNext={handleStep1Next} />}
            {currentStep === 2 && (
              <LocationStep onNext={handleStep2Next} onBack={() => goBack(1)} />
            )}
            {currentStep === 3 && (
              <PresentationStep
                onNext={handleStep3Next}
                onBack={() => goBack(2)}
              />
            )}
            {currentStep === 4 && (
              <OperationalStep
                onNext={handleStep4Next}
                onBack={() => goBack(3)}
                isSubmitting={isSubmitting}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
