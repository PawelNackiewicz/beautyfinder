import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, Button, Input, PageHeader } from "@/components";
import { Plus, Search, Phone, Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export const Route = createFileRoute("/clients")({
  component: Clients,
});

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  visitsCount: number;
  lastVisit: string;
  tags: string[];
  notes?: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Nowak",
    phone: "+48 512 345 678",
    visitsCount: 15,
    lastVisit: "2024-01-10",
    tags: ["VIP", "Manicure"],
  },
  {
    id: "2",
    firstName: "Katarzyna",
    lastName: "Wiśniewska",
    phone: "+48 501 234 567",
    visitsCount: 8,
    lastVisit: "2024-01-08",
    tags: ["Brwi"],
  },
  {
    id: "3",
    firstName: "Joanna",
    lastName: "Kowalczyk",
    phone: "+48 601 987 654",
    visitsCount: 22,
    lastVisit: "2024-01-12",
    tags: ["VIP", "Masaż"],
  },
  {
    id: "4",
    firstName: "Aleksandra",
    lastName: "Dąbrowska",
    phone: "+48 505 111 222",
    visitsCount: 5,
    lastVisit: "2024-01-05",
    tags: ["Pedicure"],
  },
  {
    id: "5",
    firstName: "Magdalena",
    lastName: "Lewandowska",
    phone: "+48 508 333 444",
    visitsCount: 12,
    lastVisit: "2024-01-11",
    tags: ["Henna", "Brwi"],
  },
  {
    id: "6",
    firstName: "Paulina",
    lastName: "Zielińska",
    phone: "+48 502 555 666",
    visitsCount: 3,
    lastVisit: "2024-01-02",
    tags: ["Nowy klient"],
  },
];

function Clients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Klienci"
        description="Zarządzaj bazą klientów salonu"
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj klienta
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj klienta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filtry</Button>
      </div>

      {/* Clients Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Klient
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Telefon
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Wizyty
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Ostatnia wizyta
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Tagi
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <tr
                key={client.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {client.firstName[0]}
                        {client.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {client.firstName} {client.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{client.phone}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{client.visitsCount} wizyt</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {client.lastVisit}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          tag === "VIP"
                            ? "bg-warning/10 text-warning"
                            : tag === "Nowy klient"
                            ? "bg-info/10 text-info"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
