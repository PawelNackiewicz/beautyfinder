import { Typography } from "@repo/ui/components";
import { UpcomingAppointmentCard } from "./components/UpcomingAppointmentCard";
import { PastVisitsList } from "./components/PastVisitsList";
import { UserProfileCard } from "./components/UserProfileCard";
import { SiteHeader } from "components";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  fetchUserProfile,
  fetchUserAppointments,
} from "../lib/api-client";

export default async function ProfilePage() {
  const { userId } = await auth();

  // Dodatkowa ochrona - redirect jeśli nie zalogowany
  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch real data from API
  let user = null;
  let appointments = [];

  try {
    [user, appointments] = await Promise.all([
      fetchUserProfile(),
      fetchUserAppointments(),
    ]);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    // Fallback to empty state or mock data
  }

  // Get upcoming appointment (first one sorted by date)
  const upcomingAppointment = appointments?.[0];

  // Get past visits (rest of appointments)
  const pastVisits = appointments?.slice(1) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="container mx-auto grid grid-cols-8 gap-6 p-6">
        <div className="col-span-5">
          <Typography variant="h2" className="mb-6">
            Najbliższa wizyta
          </Typography>

          {upcomingAppointment ? (
            <UpcomingAppointmentCard appointment={upcomingAppointment} />
          ) : (
            <div className="text-gray-500">Brak nadchodzących wizyt</div>
          )}

          {pastVisits.length > 0 && <PastVisitsList visits={pastVisits} />}
        </div>

        <div className="col-span-3">
          <Typography variant="h2" className="mb-6">
            Twój profil
          </Typography>

          {user && <UserProfileCard user={user} />}

        </div>
      </main>
    </div>
  );
}
