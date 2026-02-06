import { Metadata } from "next";
import { Footer, SiteHeader } from "components";
import { mockSpecialist, mockPortfolioImages, mockReviews } from "./mocks";
import {
  ProfileTabsSection,
  ProfileHeroSection,
  PortfolioSection,
  ReviewsSection,
} from "./components";

export async function generateMetadata(): Promise<Metadata> {
  const specialist = mockSpecialist;

  return {
    title: `${specialist.name} - ${specialist.specialty} | Beautyfinder`,
    description: specialist.description,
    openGraph: {
      title: `${specialist.name} - ${specialist.specialty}`,
      description: specialist.description,
      images: [specialist.avatarUrl],
    },
  };
}

export default async function SpecialistPage() {
  const specialist = mockSpecialist;

  return (
    <>
      {/* JSON-LD for Person / Specialist */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: specialist.name,
            image: specialist.avatarUrl,
            jobTitle: specialist.specialty,
            worksFor: {
              "@type": "BeautySalon",
              name: specialist.salonName,
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: specialist.city,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: specialist.rating,
              reviewCount: specialist.reviewCount,
            },
          }),
        }}
      />

      <div className="min-h-screen bg-background">
        <SiteHeader />

        <main>
          <ProfileTabsSection />
          <ProfileHeroSection specialist={specialist} />
          <PortfolioSection images={mockPortfolioImages} />
          <ReviewsSection
            reviews={mockReviews}
            rating={specialist.rating}
            reviewCount={specialist.reviewCount}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
