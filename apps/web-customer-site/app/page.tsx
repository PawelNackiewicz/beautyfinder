import { fetchPremiumSalons } from "./lib/api-client";

import { mockCustomerName, mockRecentVisits } from "./lib/recent-visits.mock";
import { mockExperts } from "./lib/experts.mock";
import { mockLastMinuteSlots } from "./lib/last-minute-slots.mock";
import {
  CategoryTabs,
  CityGridSection,
  HeroSection,
  LastMinuteSlotsSection,
  PremiumSalonsSection,
  RecentVisitsSection,
  VerifiedExpertsSection,
  AddSalonCTA,
} from "./components";
import { Footer, SiteHeader } from "components";
import { SignedIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const premiumSalons = await fetchPremiumSalons();
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoryTabs />

        {/* Personalizowane sekcje tylko dla zalogowanych */}
        <SignedIn>
          <RecentVisitsSection
            customerName={user?.firstName || mockCustomerName}
            recentVisits={mockRecentVisits}
          />
        </SignedIn>

        <VerifiedExpertsSection experts={mockExperts} />
        <LastMinuteSlotsSection slots={mockLastMinuteSlots} />
        <CityGridSection />
        <PremiumSalonsSection salons={premiumSalons} />
        <AddSalonCTA />
      </main>
      <Footer />
    </div>
  );
}
