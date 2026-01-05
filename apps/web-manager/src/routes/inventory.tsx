import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, Button, Input, PageHeader } from "@/components";
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export const Route = createFileRoute("/inventory")({
  component: Inventory,
});

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  price: number;
  lastMovement: { type: "in" | "out"; date: string; quantity: number };
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Lakier hybrydowy czerwony",
    category: "Lakiery",
    quantity: 12,
    minQuantity: 5,
    unit: "szt",
    price: 45,
    lastMovement: { type: "out", date: "2024-01-12", quantity: 1 },
  },
  {
    id: "2",
    name: "Żel budujący przezroczysty",
    category: "Żele",
    quantity: 3,
    minQuantity: 5,
    unit: "szt",
    price: 120,
    lastMovement: { type: "out", date: "2024-01-11", quantity: 2 },
  },
  {
    id: "3",
    name: "Olejek do masażu 500ml",
    category: "Masaż",
    quantity: 8,
    minQuantity: 3,
    unit: "szt",
    price: 85,
    lastMovement: { type: "in", date: "2024-01-10", quantity: 10 },
  },
  {
    id: "4",
    name: "Henna brwi ciemny brąz",
    category: "Henna",
    quantity: 15,
    minQuantity: 5,
    unit: "szt",
    price: 35,
    lastMovement: { type: "out", date: "2024-01-12", quantity: 1 },
  },
  {
    id: "5",
    name: "Wata celulozowa 500szt",
    category: "Akcesoria",
    quantity: 2,
    minQuantity: 3,
    unit: "op",
    price: 25,
    lastMovement: { type: "out", date: "2024-01-09", quantity: 1 },
  },
  {
    id: "6",
    name: "Pilnik 100/180",
    category: "Akcesoria",
    quantity: 45,
    minQuantity: 20,
    unit: "szt",
    price: 8,
    lastMovement: { type: "in", date: "2024-01-08", quantity: 50 },
  },
];

function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = mockProducts.filter(
    (p) => p.quantity <= p.minQuantity
  ).length;

  return (
    <DashboardLayout>
      <PageHeader
        title="Magazyn"
        description="Zarządzaj stanami magazynowymi produktów"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <TrendingDown className="w-4 h-4 mr-2" />
              Wydanie
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Przyjęcie
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Produkty ogółem</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {mockProducts.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
        <div
          className="stat-card animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Niski stan</p>
              <p className="text-2xl font-bold text-warning mt-1">
                {lowStockCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
          </div>
        </div>
        <div
          className="stat-card animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wartość magazynu</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                4,580 zł
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6 animate-fade-in">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj produktu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Produkt
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Kategoria
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Stan
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Ostatni ruch
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Cena jedn.
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const isLowStock = product.quantity <= product.minQuantity;

              return (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-semibold",
                          isLowStock ? "text-warning" : "text-foreground"
                        )}
                      >
                        {product.quantity} {product.unit}
                      </span>
                      {isLowStock && (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      min. {product.minQuantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {product.lastMovement.type === "in" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {product.lastMovement.type === "in" ? "+" : "-"}
                        {product.lastMovement.quantity}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.lastMovement.date}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">
                      {product.price} zł
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
