import { redirect } from "next/navigation";
import { SERVICES, CITIES } from "../lib/mockData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Backwards-compatibility redirects — real pages moved to /uslugi/ and /miasto/
export default async function LegacySlugRedirect(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  if (SERVICES.some((s) => s.id === slug)) {
    redirect(`/uslugi/${slug}`);
  }

  if (CITIES.some((c) => c.slug === slug)) {
    redirect(`/miasto/${slug}`);
  }

  redirect("/");
}
