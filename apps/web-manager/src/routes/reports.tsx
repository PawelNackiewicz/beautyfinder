import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, PageHeader } from "@repo/ui/components";
import { DashboardLayout } from "@/components";
import {
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Scissors,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const Route = createFileRoute("/reports")({
  component: Reports,
});

const monthlyData = [
  { month: "Sty", revenue: 12400, profit: 8200 },
  { month: "Lut", revenue: 15600, profit: 10100 },
  { month: "Mar", revenue: 14200, profit: 9400 },
  { month: "Kwi", revenue: 18900, profit: 12800 },
  { month: "Maj", revenue: 21500, profit: 14200 },
  { month: "Cze", revenue: 19800, profit: 13100 },
  { month: "Lip", revenue: 22400, profit: 15600 },
  { month: "Sie", revenue: 24100, profit: 16800 },
  { month: "Wrz", revenue: 20300, profit: 13900 },
  { month: "Paź", revenue: 23600, profit: 15400 },
  { month: "Lis", revenue: 25800, profit: 17200 },
  { month: "Gru", revenue: 28400, profit: 19100 },
];

const topServices = [
  { name: "Manicure hybrydowy", visits: 145, revenue: 17400 },
  { name: "Masaż relaksacyjny", visits: 82, revenue: 12300 },
  { name: "Stylizacja brwi", visits: 98, revenue: 7840 },
  { name: "Pedicure klasyczny", visits: 67, revenue: 6700 },
  { name: "Henna brwi i rzęs", visits: 54, revenue: 3240 },
];

const topEmployees = [
  { name: "Anna Kowalska", visits: 186, revenue: 24800 },
  { name: "Ewa Mazur", visits: 142, revenue: 18600 },
];

function Reports() {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("year");

  return (
    <DashboardLayout>
      <PageHeader
        title="Raporty"
        description="Analiza finansowa i statystyki salonu"
        actions={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Eksport CSV
          </Button>
        }
      />

      {/* Period Selector */}
      <div className="flex items-center gap-2 mb-6 animate-fade-in">
        {[
          { value: "month", label: "Miesiąc" },
          { value: "quarter", label: "Kwartał" },
          { value: "year", label: "Rok" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() =>
              setPeriod(option.value as "month" | "quarter" | "year")
            }
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              period === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card animate-slide-up">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Obrót roczny</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                247,000 zł
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+24%</span>
                <span className="text-xs text-muted-foreground">
                  vs poprz. rok
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
        <div
          className="stat-card animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Zysk netto</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                166,800 zł
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+18%</span>
                <span className="text-xs text-muted-foreground">
                  vs poprz. rok
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
        </div>
        <div
          className="stat-card animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Klienci</p>
              <p className="text-2xl font-bold text-foreground mt-1">342</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+56</span>
                <span className="text-xs text-muted-foreground">nowych</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-info/10">
              <Users className="w-5 h-5 text-info" />
            </div>
          </div>
        </div>
        <div
          className="stat-card animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wizyty</p>
              <p className="text-2xl font-bold text-foreground mt-1">1,847</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+12%</span>
                <span className="text-xs text-muted-foreground">
                  vs poprz. rok
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-warning/10">
              <Scissors className="w-5 h-5 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Obroty miesięczne
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Chart */}
        <div
          className="bg-card rounded-xl border border-border p-6 shadow-sm animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Trend zysku
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Najpopularniejsze usługi
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                  Usługa
                </th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                  Wizyty
                </th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                  Przychód
                </th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((service, index) => (
                <tr
                  key={service.name}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">
                        {service.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-right text-muted-foreground">
                    {service.visits}
                  </td>
                  <td className="p-3 text-right font-medium text-foreground">
                    {service.revenue.toLocaleString()} zł
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Employees */}
        <div
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Wyniki pracowników
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                  Pracownik
                </th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                  Wizyty
                </th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                  Przychód
                </th>
              </tr>
            </thead>
            <tbody>
              {topEmployees.map((employee) => (
                <tr
                  key={employee.name}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-right text-muted-foreground">
                    {employee.visits}
                  </td>
                  <td className="p-3 text-right font-medium text-foreground">
                    {employee.revenue.toLocaleString()} zł
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
