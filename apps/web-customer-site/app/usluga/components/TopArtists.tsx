import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components";
import type { TopArtist } from "../mockData";

type TopArtistsProps = {
  artists: TopArtist[];
};

export function TopArtists({ artists }: TopArtistsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold italic text-gray-900">
            Topowi Artyści
          </h2>
          <Link
            href="/artysci"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2 italic"
          >
            Wszystkie profile
          </Link>
        </div>

        {/* Artists grid */}
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artysta/${artist.slug}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              {/* Avatar with gold ring */}
              <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-amber-400 to-amber-600">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm">
                    {artist.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              {/* Name */}
              <span className="text-xs font-semibold text-gray-900 text-center group-hover:underline">
                {artist.name}
              </span>
              {/* Specialty */}
              <span className="text-[11px] text-gray-500 text-center -mt-1">
                {artist.specialty}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
