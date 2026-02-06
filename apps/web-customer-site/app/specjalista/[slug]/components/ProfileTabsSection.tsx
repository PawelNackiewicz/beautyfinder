"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components";

interface ProfileTab {
  id: string;
  label: string;
  avatarUrl: string;
}

const tabs: ProfileTab[] = [
  {
    id: "prace",
    label: "MOJE PRACE",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
  },
  {
    id: "salon",
    label: "SALON",
    avatarUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=100",
  },
  {
    id: "o-mnie",
    label: "O MNIE",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
  },
];

export function ProfileTabsSection() {
  return (
    <section className="container mx-auto px-4 pt-6">
      <div className="flex items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center gap-1.5 group"
          >
            <Avatar className="size-16 ring-2 ring-primary ring-offset-2 ring-offset-background group-hover:ring-primary/70 transition-all">
              <AvatarImage src={tab.avatarUrl} alt={tab.label} />
              <AvatarFallback>{tab.label[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold tracking-wide text-foreground">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
