import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { DashboardLayout } from "@/components";
import { PageHeader } from "@repo/ui/components";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const today = format(new Date(), "EEEE, d MMMM", { locale: pl });

  return (
    <DashboardLayout>
      <PageHeader
        title="Kalendarz wizyt"
        description={`${today} • Zarządzaj wizytami i harmonogramem`}
      />
    </DashboardLayout>
  );
}
