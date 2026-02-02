import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
} from "@repo/ui/components";
import { StarRating } from "../StarRating";
import type { Expert } from "../../lib/experts.mock";

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group">
      <CardContent className="flex flex-col items-center gap-3">
        {/* Avatar with border */}
        <div className="relative">
          <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-border group-hover:border-primary transition-colors">
            <AvatarImage
              src={expert.imageUrl}
              alt={expert.name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Expert Info */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h3 className="font-semibold text-lg text-foreground">
            {expert.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {expert.specialization}
          </p>

          {/* Rating */}
          <StarRating rating={expert.rating} />

          {/* Expert Badge */}
          {expert.verified && (
            <Badge
              variant="secondary"
              className="mt-1 bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-500/20"
            >
              Expert
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
