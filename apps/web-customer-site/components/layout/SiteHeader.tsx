"use client";

import {
  MapPin,
  Search,
  User,
  Calendar as CalendarIcon,
  LogIn,
  Gift,
} from "lucide-react";
import Link from "next/link";
import { Button, Separator } from "@repo/ui/components";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">
            BeautyFinder
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-2xl w-full bg-muted/50 rounded-full border border-border/50 p-1 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-1 flex items-center px-4 relative group/input">
            <Search className="w-4 h-4 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
            <input
              className="bg-transparent border-none outline-none text-sm w-full h-10 placeholder:text-muted-foreground/80"
              placeholder="Usługa (np. masaż)"
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1 flex items-center px-4 relative group/input">
            <MapPin className="w-4 h-4 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
            <input
              className="bg-transparent border-none outline-none text-sm w-full h-10 placeholder:text-muted-foreground/80"
              placeholder="Miasto"
              defaultValue="Warszawa"
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1 flex items-center px-4 relative group/input">
            <CalendarIcon className="w-4 h-4 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
            <input
              type="date"
              className="bg-transparent border-none outline-none text-sm w-full h-10 placeholder:text-muted-foreground/80 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
              placeholder="Jutro"
            />
          </div>
          <Button size="icon" className="rounded-full h-10 w-10 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* User Panel */}
        <div className="flex items-center gap-2 shrink-0">
          <Button className="hidden sm:flex gap-2" asChild>
            <Link href="/kup-bon">
              <Gift className="w-4 h-4" />
              Kup Bon
            </Link>
          </Button>

          <SignedOut>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/sign-in">
                <LogIn className="w-5 h-5" />
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="/profile">
                <User className="w-5 h-5" />
              </Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
