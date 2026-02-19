"use client";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@repo/ui/components";
import { LogOut, User } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

export const UserProfileButton = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full hover:opacity-80 transition-opacity focus:outline-none">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || "User"}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {/* Profile Link */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <User className="w-4 h-4 mr-2" />
            Mój Profil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem asChild>
          <SignOutButton redirectUrl="/">
            <button className="w-full text-left flex items-center text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj się
            </button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
