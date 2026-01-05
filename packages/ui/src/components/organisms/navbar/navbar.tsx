"use client";
import { Search, Menu, X, MapPin, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, Button } from "@repo/ui";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? "bg-background/80 backdrop-blur-lg"
          : "bg-background shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              Salon<span className="text-primary">Finder</span>
            </span>
          </Link>

          {/* Desktop Search - hidden on homepage since it has its own search */}
          {!isHomePage && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Szukaj salonu lub usługi..."
                  className="pl-10 bg-muted/50 border-transparent focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dla-salonow">Dla Salonów</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/logowanie">
                <User className="w-4 h-4" />
                Zaloguj się
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {!isHomePage && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Szukaj salonu lub usługi..."
                    className="pl-10"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link
                    href="/dla-salonow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dla Salonów
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/logowanie" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4" />
                    Zaloguj się
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
