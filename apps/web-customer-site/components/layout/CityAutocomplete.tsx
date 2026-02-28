"use client";

import { Check, MapPin } from "lucide-react";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@repo/ui/components";
import { CITIES } from "../../app/lib/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Fallback city names extracted from mock data
const FALLBACK_CITIES = CITIES.map((c) => c.name);

export interface CityAutocompleteHandle {
  getValue: () => string;
}

interface CityAutocompleteProps {
  defaultValue?: string;
}

export const CityAutocomplete = forwardRef<
  CityAutocompleteHandle,
  CityAutocompleteProps
>(({ defaultValue = "Warszawa" }, ref) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<string[]>(FALLBACK_CITIES);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expose getValue to parent via ref
  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

  // Fetch distinct cities from API
  useEffect(() => {
    let cancelled = false;

    async function fetchCities() {
      try {
        const response = await fetch(`${API_URL}/locations/cities`);
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data: string[] = await response.json();
        if (!cancelled && data.length > 0) {
          setCities(data);
        }
      } catch {
        // Keep fallback cities on error
      }
    }

    fetchCities();
    return () => {
      cancelled = true;
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCity = useCallback((city: string) => {
    setInputValue(city);
    setSearch("");
    setIsOpen(false);
  }, []);

  // Filter cities based on search input
  const filteredCities = search
    ? cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()))
    : cities;

  return (
    <div ref={containerRef} className="flex-1 relative group/input">
      <div className="flex items-center px-4">
        <MapPin className="w-4 h-4 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
        <input
          ref={inputRef}
          className="bg-transparent border-none outline-none text-sm w-full h-10 placeholder:text-muted-foreground/80"
          placeholder="Miasto"
          value={isOpen ? search : inputValue}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setSearch("");
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
              setSearch("");
              inputRef.current?.blur();
            }
          }}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="city-listbox"
          autoComplete="off"
          suppressHydrationWarning
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          <Command
            className="rounded-md border bg-popover text-popover-foreground shadow-md"
            shouldFilter={false}
          >
            <CommandList id="city-listbox" className="max-h-50">
              {filteredCities.length === 0 ? (
                <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
                  Nie znaleziono miasta
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredCities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={() => selectCity(city)}
                      className="gap-2"
                    >
                      <MapPin className="size-4 text-muted-foreground" />
                      <span className="flex-1">{city}</span>
                      {inputValue === city && (
                        <Check className="size-4 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
});

CityAutocomplete.displayName = "CityAutocomplete";
