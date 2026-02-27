import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
    city: string;
  }>;
}

// Backwards-compatibility redirect — real page moved to /uslugi/[slug]/[city]
export default async function LegacySlugCityRedirect(props: PageProps) {
  const params = await props.params;
  const { slug, city } = params;

  redirect(`/uslugi/${slug}/${city}`);
}
