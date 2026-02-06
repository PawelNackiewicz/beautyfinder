import { Star } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Typography,
} from "@repo/ui/components";
import { SpecialistReview } from "../types";

interface ReviewsSectionProps {
  reviews: SpecialistReview[];
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({
  reviews,
  rating,
  reviewCount,
}: ReviewsSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Typography variant="h2">Opinie klientów</Typography>
        <div className="flex items-center gap-1.5">
          <Star className="size-5 fill-primary text-primary" />
          <Typography variant="large">{rating}</Typography>
        </div>
        <Typography variant="muted">({reviewCount} opinii)</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="size-10">
                  <AvatarImage
                    src={review.authorAvatarUrl}
                    alt={review.authorName}
                  />
                  <AvatarFallback>
                    {review.authorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="large">{review.authorName}</Typography>
                    <Typography variant="muted" className="text-xs">
                      {review.date}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Typography variant="p" className="text-muted-foreground italic">
                {review.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg">
          Pokaż wszystkie opinie
        </Button>
      </div>
    </section>
  );
}
