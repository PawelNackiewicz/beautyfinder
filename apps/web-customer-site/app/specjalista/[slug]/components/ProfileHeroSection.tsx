import { Award, Star } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  Progress,
  Typography,
} from "@repo/ui/components";
import { SpecialistDetail } from "../types";

interface ProfileHeroSectionProps {
  specialist: SpecialistDetail;
}

export function ProfileHeroSection({ specialist }: ProfileHeroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Avatar + Bio */}
        <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6">
          <Avatar className="size-28 shrink-0">
            <AvatarImage src={specialist.avatarUrl} alt={specialist.name} />
            <AvatarFallback>
              {specialist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Typography variant="h1" className="mb-1">
              {specialist.name}
            </Typography>
            <Typography variant="lead" className="mb-4">
              {specialist.specialty} | {specialist.yearsOfExperience} lat
              doświadczenia
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              {specialist.description}
            </Typography>
          </div>
        </div>

        {/* Right: Status Card */}
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Star className="size-3 fill-current" />
                STATUS: TOP STYLISTA
              </Badge>

              <Typography variant="h3" className="text-primary-foreground mb-1">
                Wczoraj u {specialist.name.split(" ")[0]}
              </Typography>
              <Typography variant="h2" className="text-primary-foreground mb-2">
                było {specialist.yesterdayVisitors} osób
              </Typography>
              <Progress
                value={75}
                className="h-2 bg-primary-foreground/20 [&>div]:bg-primary-foreground"
              />
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 p-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Award className="size-5" />
              </div>
              <div>
                <Typography variant="large" className="text-primary-foreground">
                  Top {specialist.cityRankPercentile}% w mieście
                </Typography>
                <Typography
                  variant="small"
                  className="text-primary-foreground/80"
                >
                  Najwyżej oceniany w Twojej okolicy
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
