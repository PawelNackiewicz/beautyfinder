import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@repo/ui/components";
import type { User } from "../types";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="max-w-2xl mb-8">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback className="text-2xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            {/* Header with name and edit button */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
              <Button variant="default" size="sm">
                Edytuj profil
              </Button>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span>📧</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>📱</span>
                <span className="text-gray-700">{user.phone}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t"></div>

            {/* Allergies Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span>⚠️</span>
                <span className="text-sm font-medium">Alergie i uwagi:</span>
              </div>
              <div className="bg-muted p-3 rounded-md text-sm text-gray-700">
                {user.allergies}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
