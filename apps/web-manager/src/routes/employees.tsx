import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, Button, PageHeader } from "@/components";
import {
  Plus,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Shield,
  User,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export const Route = createFileRoute("/employees")({
  component: Employees,
});

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "owner" | "employee";
  services: string[];
  schedule: { day: string; hours: string }[];
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "Anna",
    lastName: "Kowalska",
    email: "anna.kowalska@beaution.pl",
    phone: "+48 500 100 200",
    role: "owner",
    services: ["Manicure hybrydowy", "Pedicure klasyczny", "Stylizacja brwi"],
    schedule: [
      { day: "Pon", hours: "9:00 - 17:00" },
      { day: "Wt", hours: "9:00 - 17:00" },
      { day: "Śr", hours: "9:00 - 17:00" },
      { day: "Czw", hours: "9:00 - 17:00" },
      { day: "Pt", hours: "9:00 - 15:00" },
    ],
  },
  {
    id: "2",
    firstName: "Ewa",
    lastName: "Mazur",
    email: "ewa.mazur@beaution.pl",
    phone: "+48 500 300 400",
    role: "employee",
    services: ["Masaż relaksacyjny", "Masaż twarzy", "Henna brwi i rzęs"],
    schedule: [
      { day: "Pon", hours: "10:00 - 18:00" },
      { day: "Wt", hours: "10:00 - 18:00" },
      { day: "Czw", hours: "10:00 - 18:00" },
      { day: "Pt", hours: "10:00 - 18:00" },
      { day: "Sob", hours: "9:00 - 14:00" },
    ],
  },
];

const roleLabels = {
  owner: {
    label: "Właściciel",
    icon: Shield,
    color: "bg-warning/10 text-warning",
  },
  employee: { label: "Pracownik", icon: User, color: "bg-info/10 text-info" },
};

function Employees() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Pracownicy"
        description="Zarządzaj zespołem i grafikami pracy"
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj pracownika
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockEmployees.map((employee, index) => {
          const roleInfo = roleLabels[employee.role];
          const RoleIcon = roleInfo.icon;

          return (
            <div
              key={employee.id}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {employee.firstName[0]}
                        {employee.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1",
                          roleInfo.color
                        )}
                      >
                        <RoleIcon className="w-3 h-3" />
                        {roleInfo.label}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {employee.phone}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-6 border-b border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Wykonywane usługi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {employee.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Grafik pracy
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {employee.schedule.map((item) => (
                    <div
                      key={item.day}
                      className="text-center p-2 rounded-lg bg-muted/50"
                    >
                      <p className="text-xs font-semibold text-foreground">
                        {item.day}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {item.hours}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
