"use client";

import { Check, Search } from "lucide-react";
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
import { SERVICES } from "../../app/lib/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Fallback service names extracted from mock data
const FALLBACK_SERVICES = SERVICES.map((s) => s.name);

export interface ServiceAutocompleteHandle {
  getValue: () => string;
}

interface ServiceAutocompleteProps {
  defaultValue?: string;
}

export const ServiceAutocomplete = forwardRef<
  ServiceAutocompleteHandle,
  ServiceAutocompleteProps
>(({ defaultValue = "" }, ref) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<string[]>(FALLBACK_SERVICES);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expose getValue to parent via ref
  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

  // Fetch distinct categories from API
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/treatments/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data: string[] = await response.json();
        if (!cancelled && data.length > 0) {
          setServices(data);
        }
      } catch {
        // Keep fallback services on error
      }
    }

    fetchCategories();
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

  const selectService = useCallback((service: string) => {
    setInputValue(service);
    setSearch("");
    setIsOpen(false);
  }, []);

  // Filter services based on search input
  const filteredServices = search
    ? services.filter((service) =>
        service.toLowerCase().includes(search.toLowerCase()),
      )
    : services;

  return (
    <div ref={containerRef} className="flex-1 relative group/input">
      <div className="flex items-center px-4">
        <Search className="w-4 h-4 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
        <input
          ref={inputRef}
          className="bg-transparent border-none outline-none text-sm w-full h-10 placeholder:text-muted-foreground/80"
          placeholder="Usługa (np. masaż)"
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
          aria-controls="service-listbox"
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
            <CommandList id="service-listbox" className="max-h-50">
              {filteredServices.length === 0 ? (
                <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
                  Nie znaleziono usługi
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredServices.map((service) => (
                    <CommandItem
                      key={service}
                      value={service}
                      onSelect={() => selectService(service)}
                      className="gap-2"
                    >
                      <Search className="size-4 text-muted-foreground" />
                      <span className="flex-1">{service}</span>
                      {inputValue === service && (
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

ServiceAutocomplete.displayName = "ServiceAutocomplete";
