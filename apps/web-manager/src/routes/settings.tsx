import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Input,
  Label,
  Switch,
  PageHeader,
  DashboardLayout,
} from "@/components";
import { Building2, Clock, CreditCard, Bell, Save, Upload } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Ustawienia"
        description="Konfiguracja salonu i systemu"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salon Info */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Dane salonu</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Logo salonu
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG do 2MB
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Wgraj logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salonName">Nazwa salonu</Label>
              <Input id="salonName" defaultValue="Beaution Studio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                defaultValue="ul. Piękna 15, 00-001 Warszawa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" defaultValue="+48 22 123 45 67" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                defaultValue="kontakt@beaution.pl"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Godziny otwarcia</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { day: "Poniedziałek", hours: "9:00 - 20:00", open: true },
              { day: "Wtorek", hours: "9:00 - 20:00", open: true },
              { day: "Środa", hours: "9:00 - 20:00", open: true },
              { day: "Czwartek", hours: "9:00 - 20:00", open: true },
              { day: "Piątek", hours: "9:00 - 18:00", open: true },
              { day: "Sobota", hours: "10:00 - 16:00", open: true },
              { day: "Niedziela", hours: "Zamknięte", open: false },
            ].map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Switch checked={item.open} />
                  <span className="font-medium text-foreground">
                    {item.day}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Metody płatności</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { method: "Gotówka", enabled: true },
              { method: "Karta płatnicza", enabled: true },
              { method: "Przelew bankowy", enabled: true },
              { method: "BLIK", enabled: false },
              { method: "Voucher", enabled: true },
            ].map((item) => (
              <div
                key={item.method}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
              >
                <span className="font-medium text-foreground">
                  {item.method}
                </span>
                <Switch checked={item.enabled} />
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-2">
              Dodaj metodę
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Powiadomienia</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Przypomnienia SMS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Wysyłaj SMS 24h przed wizytą
                </p>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="font-medium text-foreground">
                  Przypomnienia e-mail
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Wysyłaj e-mail 24h przed wizytą
                </p>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="font-medium text-foreground">
                  Potwierdzenie rezerwacji
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Wysyłaj potwierdzenie po rezerwacji
                </p>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">Alerty magazynowe</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Powiadamiaj o niskich stanach
                </p>
              </div>
              <Switch checked />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6 animate-fade-in">
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          Zapisz zmiany
        </Button>
      </div>
    </DashboardLayout>
  );
}
