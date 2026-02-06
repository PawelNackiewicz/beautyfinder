import Image from "next/image";
import { Star } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@repo/ui/components";
import { ClientReview } from "../types";

interface ReviewsSectionProps {
  reviews: ClientReview[];
  reviewCount: number;
}

export function ReviewsSection({ reviews, reviewCount }: ReviewsSectionProps) {
  const reviewCategories = [
    "Wszystkie",
    ...Array.from(new Set(reviews.map((r) => r.category))),
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <Typography variant="h2" className="mb-2 italic">
            Opinie klientek
          </Typography>
          <Typography variant="muted">
            {reviewCount} zweryfikowanych opinii
          </Typography>
        </div>
      </div>

      <Tabs defaultValue="Wszystkie">
        <TabsList>
          {reviewCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {reviewCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {reviews
                .filter(
                  (review) =>
                    category === "Wszystkie" || review.category === category,
                )
                .map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
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
                            <Typography variant="large">
                              {review.authorName}
                            </Typography>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="size-3.5 fill-primary text-primary"
                                  />
                                ),
                              )}
                            </div>
                          </div>
                          <Typography variant="muted" className="text-xs">
                            {review.serviceName}
                          </Typography>
                        </div>
                      </div>

                      <Typography variant="p" className="mb-3">
                        {review.comment}
                      </Typography>

                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative size-16 rounded-md overflow-hidden"
                            >
                              <Image
                                src={img}
                                alt={`Zdjęcie od ${review.authorName}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <Typography variant="muted" className="text-xs">
                        {review.date}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
