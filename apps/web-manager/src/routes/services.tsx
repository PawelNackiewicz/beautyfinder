import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, Button, Input, PageHeader } from "@/components";
import {
  Plus,
  Search,
  Clock,
  Banknote,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export const Route = createFileRoute("/services")({
  component: Services,
});

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  active: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Manicure hybrydowy",
    category: "Paznokcie",
    price: 120,
    duration: 60,
    description: "Profesjonalny manicure z trwałą hybrydą",
    active: true,
  },
  {
    id: "2",
    name: "Pedicure klasyczny",
    category: "Paznokcie",
    price: 100,
    duration: 60,
    description: "Kompleksowa pielęgnacja stóp",
    active: true,
  },
  {
    id: "3",
    name: "Stylizacja brwi",
    category: "Stylizacja brwi",
    price: 80,
    duration: 45,
    description: "Regulacja i stylizacja brwi",
    active: true,
  },
  {
    id: "4",
    name: "Henna brwi i rzęs",
    category: "Stylizacja brwi",
    price: 60,
    duration: 30,
    description: "Koloryzacja brwi i rzęs henną",
    active: true,
  },
  {
    id: "5",
    name: "Masaż relaksacyjny",
    category: "Masaże",
    price: 150,
    duration: 90,
    description: "Głęboki masaż całego ciała",
    active: true,
  },
  {
    id: "6",
    name: "Masaż twarzy",
    category: "Masaże",
    price: 80,
    duration: 45,
    description: "Relaksacyjny masaż twarzy",
    active: false,
  },
];

const categories = ["Wszystkie", "Paznokcie", "Stylizacja brwi", "Masaże"];

function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const filteredServices = mockServices.filter(
    (service) =>
      (selectedCategory === "Wszystkie" ||
        service.category === selectedCategory) &&
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Usługi"
        description="Zarządzaj ofertą usług salonu"
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj usługę
          </Button>
        }
      />

      {/* Categories */}
      <div className="flex items-center gap-2 mb-6 animate-fade-in">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6 animate-fade-in">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj usługi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className={cn(
              "bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all animate-slide-up",
              !service.active && "opacity-60"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {service.active ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{service.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-foreground font-semibold">
                <Banknote className="w-4 h-4 text-primary" />
                <span>{service.price} zł</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
