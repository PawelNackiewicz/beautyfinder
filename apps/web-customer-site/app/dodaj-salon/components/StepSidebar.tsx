"use client";

import { Progress } from "@repo/ui/components";
import { Check } from "lucide-react";
import { REGISTRATION_STEPS } from "../schemas/registration";

type StepSidebarProps = {
  currentStep: number;
  completedSteps: number[];
};

export function StepSidebar({ currentStep, completedSteps }: StepSidebarProps) {
  const totalSteps = REGISTRATION_STEPS.length;
  const progressPercent = Math.round(
    (completedSteps.length / totalSteps) * 100,
  );

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="sticky top-6 rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Postęp rejestracji
        </h3>

        <div className="space-y-1">
          {REGISTRATION_STEPS.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  isCurrent
                    ? "bg-primary/10"
                    : isCompleted
                      ? "opacity-80"
                      : "opacity-50"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium leading-tight ${
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ukończono</span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>
    </aside>
  );
}
