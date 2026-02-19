"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "beautyfinder_salon_registration";

type FormData = Record<string, unknown>;

type StoredFormState = {
    currentStep: number;
    steps: {
        businessData: FormData;
        location: FormData;
        presentation: FormData;
        operational: FormData;
    };
    lastUpdated: string;
};

export function useFormPersistence<T extends FormData>(
    stepKey: keyof StoredFormState["steps"],
    defaultValues: T,
) {
    const [isHydrated, setIsHydrated] = useState(false);

    const getStoredState = useCallback((): StoredFormState | null => {
        if (typeof window === "undefined") return null;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    }, []);

    const getStepData = useCallback((): T => {
        const state = getStoredState();
        if (!state?.steps?.[stepKey]) return defaultValues;
        return { ...defaultValues, ...state.steps[stepKey] } as T;
    }, [getStoredState, stepKey, defaultValues]);

    const saveStepData = useCallback(
        (data: T) => {
            if (typeof window === "undefined") return;
            try {
                const state = getStoredState() || {
                    currentStep: 1,
                    steps: {
                        businessData: {},
                        location: {},
                        presentation: {},
                        operational: {},
                    },
                    lastUpdated: new Date().toISOString(),
                };

                state.steps[stepKey] = data;
                state.lastUpdated = new Date().toISOString();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch {
                // localStorage quota exceeded or unavailable
            }
        },
        [getStoredState, stepKey],
    );

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return {
        getStepData,
        saveStepData,
        isHydrated,
    };
}

export function useCurrentStep() {
    const [currentStep, setCurrentStepState] = useState(1);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const state: StoredFormState = JSON.parse(stored);
                if (state.currentStep) {
                    setCurrentStepState(state.currentStep);
                }
            }
        } catch {
            // ignore
        }
    }, []);

    const setCurrentStep = useCallback((step: number) => {
        setCurrentStepState(step);
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const state: StoredFormState = stored
                ? JSON.parse(stored)
                : {
                    currentStep: 1,
                    steps: {
                        businessData: {},
                        location: {},
                        presentation: {},
                        operational: {},
                    },
                    lastUpdated: new Date().toISOString(),
                };
            state.currentStep = step;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // ignore
        }
    }, []);

    return { currentStep, setCurrentStep };
}

export function clearRegistrationData() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}

export function getFullRegistrationData(): StoredFormState["steps"] | null {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        const state: StoredFormState = JSON.parse(stored);
        return state.steps;
    } catch {
        return null;
    }
}
