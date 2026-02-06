import { Metadata } from "next";
import {
  mockSalonData,
  mockLastMinuteDeals,
  mockPortfolioImages,
  mockServiceCategories,
  mockTeamMembers,
  mockClientReviews,
  mockSalonContact,
} from "./mocks";
import {
  HeroSection,
  LastMinuteSection,
  PortfolioSection,
  ServicesSection,
  TeamSection,
  ReviewsSection,
  ContactSection,
} from "./components";

export async function generateMetadata(): Promise<Metadata> {
  const salon = mockSalonData;

  return {
    title: `${salon.name} - ${salon.city} | Beautyfinder`,
    description: salon.tagline,
    openGraph: {
      title: salon.name,
      description: salon.tagline,
      images: [salon.heroImage],
    },
  };
}

export default async function SalonPage() {
  const salon = mockSalonData;

  return (
    <>
      {/* JSON-LD for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: salon.name,
            image: salon.heroImage,
            address: {
              "@type": "PostalAddress",
              streetAddress: salon.address,
              addressLocality: salon.city,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: salon.rating,
              reviewCount: salon.reviewCount,
            },
          }),
        }}
      />

      <div className="min-h-screen">
        <HeroSection salon={salon} />
        <LastMinuteSection deals={mockLastMinuteDeals} />
        <PortfolioSection images={mockPortfolioImages} />
        <ServicesSection categories={mockServiceCategories} />
        <TeamSection members={mockTeamMembers} />
        <ReviewsSection
          reviews={mockClientReviews}
          reviewCount={salon.reviewCount}
        />
        <ContactSection contact={mockSalonContact} />
      </div>
    </>
  );
}
