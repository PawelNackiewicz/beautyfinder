import { Button } from "@repo/ui/components";
import Link from "next/link";
import { Gift, User } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { CategoryTabs } from "./components/CategoryTabs";
import CityGrid from "./components/CityGrid";
import ListView from "./components/ListView";
import { fetchMapSalons, fetchPremiumSalons } from "./lib/api-client";

import { Footer } from "./components/layout/Footer";
import { RecentVisitsSection } from "./components/RecentVisitsSection";
import { mockCustomerName, mockRecentVisits } from "./lib/recent-visits.mock";
import { VerifiedExpertsSection } from "./components/VerifiedExpertsSection";
import { mockExperts } from "./lib/experts.mock";
import { LastMinuteSlotsSection } from "./components/LastMinuteSlotsSection";
import { mockLastMinuteSlots } from "./lib/last-minute-slots.mock";

export default async function Home() {
  // Fetch premium salons and map salons data server-side
  const [premiumSalons, mapSalons] = await Promise.all([
    fetchPremiumSalons(),
    fetchMapSalons(),
  ]);

  // TODO: Replace with actual API call when authentication is ready
  // const recentVisits = await fetchRecentVisits();
  // const customerName = await getCustomerName();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryTabs />
        <RecentVisitsSection
          customerName={mockCustomerName}
          recentVisits={mockRecentVisits}
        />
        <VerifiedExpertsSection experts={mockExperts} />
        <LastMinuteSlotsSection slots={mockLastMinuteSlots} />
        <CityGrid />
        <ListView
          salons={premiumSalons}
          mapSalons={mapSalons}
          title="Premium Salony dla Ciebie"
          subtitle={`Odkryj ${premiumSalons.length} najlepszych salonów premium w Polsce`}
        />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl lg:text-3xl font-serif font-bold text-primary">
            BeautyFinder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href={process.env.NEXT_PUBLIC_WEB_MANAGER_APP_URL ?? "#"}>
            <Button variant="outline" className="font-medium">
              Dla firm
            </Button>
          </Link>
          <Link href="/kup-bon">
            <Button className="gap-2">
              <Gift className="w-4 h-4" />
              Kup Bon
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            asChild
          >
            <Link href="/profile">
              <User className="w-5 h-5" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  </header>
);
