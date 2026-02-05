import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
} from "@repo/ui/components";
import { StarRating } from "../atoms/StarRating";
import type { Expert } from "../../app/lib/experts.mock";

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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all p-0">
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <Avatar className="size-32 lg:size-40 border-4 border-border group-hover:border-primary transition-colors">
          <AvatarImage
            src={expert.imageUrl}
            alt={expert.name}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1.5 text-center flex items-center flex-col">
          <h3 className="font-semibold text-lg">{expert.name}</h3>
          <p className="text-sm text-muted-foreground">
            {expert.specialization}
          </p>
          <StarRating rating={expert.rating} />
          {expert.verified && (
            <Badge variant="outline" className="mt-1">
              Expert
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
