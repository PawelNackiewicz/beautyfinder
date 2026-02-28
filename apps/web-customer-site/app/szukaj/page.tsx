import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { StandardPageLayout, ListingView } from "components";
import { searchSalons, type SearchSalonResult } from "../lib/api-client";
import { generateSlug } from "../lib/utils";
import type { Salon } from "../lib/mockData";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    city?: string;
    date?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const parts: string[] = [];
  if (params.q) parts.push(params.q);
  if (params.city) parts.push(params.city);

  const title = parts.length
    ? `${parts.join(" w ")} — Wyniki wyszukiwania | BeautyFinder`
    : "Wyszukiwanie salonów | BeautyFinder";

  const description = parts.length
    ? `Znajdź najlepsze salony beauty: ${parts.join(" w ")}. Porównaj oferty, sprawdź opinie i zarezerwuj wizytę.`
    : "Przeszukaj salony beauty i wellness w Polsce. Porównaj oferty, sprawdź opinie.";

  return { title, description };
}

function toSalonCard(result: SearchSalonResult): Salon {
  const loc = result.primaryLocation;
  const category =
    result.treatments[0]?.category?.toLowerCase() ?? "kosmetyczka";
  return {
    id: result.id,
    slug: result.slug,
    name: result.name,
    category,
    rating: result.reviewStats.averageRating,
    reviews: result.reviewStats.reviewCount,
    location: loc
      ? `${loc.streetAddress}, ${loc.city}`
      : "Brak adresu",
    city: loc?.city ?? "",
    citySlug: loc ? generateSlug(loc.city) : "",
    imageUrl:
      result.imageUrl ??
      `https://picsum.photos/seed/salon${result.id}/400/300`,
    coordinates:
      loc?.latitude && loc?.longitude
        ? { lat: loc.latitude, lng: loc.longitude }
        : null,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;

  const response = await searchSalons({
    q: params.q,
    city: params.city,
    date: params.date,
    page: currentPage,
    limit: 20,
  });

  const salons = response.data.map(toSalonCard);
  const { meta } = response;

  const titleParts: string[] = [];
  if (params.q) titleParts.push(`„${params.q}"`);
  if (params.city) titleParts.push(`w ${params.city}`);
  const searchTitle = titleParts.length
    ? `Wyniki: ${titleParts.join(" ")}`
    : "Wszystkie salony";

  const hasResults = salons.length > 0;

  return (
    <StandardPageLayout>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Powrót do strony głównej
      </Link>

      {hasResults ? (
        <>
          <ListingView
            salons={salons}
            title={searchTitle}
            subtitle={`Znaleziono ${meta.total} salonów`}
          />

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 py-8">
              {currentPage > 1 && (
                <Link
                  href={buildSearchUrl(params, currentPage - 1)}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Poprzednia
                </Link>
              )}
              <span className="px-4 py-2 text-muted-foreground">
                Strona {currentPage} z {meta.totalPages}
              </span>
              {currentPage < meta.totalPages && (
                <Link
                  href={buildSearchUrl(params, currentPage + 1)}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Następna
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Brak wyników</h2>
          <p className="text-muted-foreground max-w-md">
            Nie znaleziono salonów pasujących do Twojego wyszukiwania.
            Spróbuj zmienić kryteria lub sprawdź popularne kategorie.
          </p>
          <Link
            href="/uslugi"
            className="mt-6 text-primary hover:underline font-medium"
          >
            Przeglądaj kategorie usług
          </Link>
        </div>
      )}
    </StandardPageLayout>
  );
}

function buildSearchUrl(
  params: { q?: string; city?: string; date?: string },
  page: number,
): string {
  const url = new URLSearchParams();
  if (params.q) url.set("q", params.q);
  if (params.city) url.set("city", params.city);
  if (params.date) url.set("date", params.date);
  url.set("page", String(page));
  return `/szukaj?${url.toString()}`;
}
