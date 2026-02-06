import { Star } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Typography,
} from "@repo/ui/components";
import { TeamMember } from "../types";

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Typography variant="h2" className="mb-2 italic">
            Nasz Zespół
          </Typography>
          <Typography variant="muted">Poznaj naszych ekspertów</Typography>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <Avatar className="size-24 mb-3">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Typography variant="large">{member.name}</Typography>
              <Typography variant="muted" className="text-xs">
                {member.role}
              </Typography>
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <Typography variant="muted" className="text-xs mt-1">
                {member.yearsOfExperience} lat doświadczenia
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
