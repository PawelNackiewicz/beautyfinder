import { Typography } from "@repo/ui/components";
import { UpcomingAppointmentCard } from "./components/UpcomingAppointmentCard";
import { PastVisitsList } from "./components/PastVisitsList";
import { UserProfileCard } from "./components/UserProfileCard";
import { VouchersAndRewardsCard } from "./components/VouchersAndRewardsCard";
import {
  mockUser,
  mockAppointment,
  mockPastVisits,
  mockVouchersAndRewards,
} from "./mocks";
import { SiteHeader } from "components";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();

  // Dodatkowa ochrona - redirect jeśli nie zalogowany
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="container mx-auto grid grid-cols-8 gap-6 p-6">
        <div className="col-span-5">
          <Typography variant="h2" className="mb-6">
            Najbliższa wizyta
          </Typography>

          <UpcomingAppointmentCard appointment={mockAppointment} />

          <PastVisitsList visits={mockPastVisits} />
        </div>

        <div className="col-span-3">
          <Typography variant="h2" className="mb-6">
            Twój profil
          </Typography>

          <UserProfileCard user={mockUser} />

          <VouchersAndRewardsCard data={mockVouchersAndRewards} />
        </div>
      </main>
    </div>
  );
}
