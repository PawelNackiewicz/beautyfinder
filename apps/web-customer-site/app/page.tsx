import { Button } from "@repo/ui/components";
import Link from "next/link";
import { Facebook, Gift, Instagram, Linkedin, User } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { CategoryTabs } from "./components/CategoryTabs";
import CityGrid from "./components/CityGrid";
import ListView from "./components/ListView";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <CategoryTabs />
          <CityGrid />
          <ListView />
        </main>
        <Footer />
    </div>
  );
}

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl lg:text-3xl font-serif font-bold text-primary">
            BeautyFinder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href={process.env.NEXT_PUBLIC_WEB_MANAGER_APP_URL ?? "#"}>
            <Button variant="outline" className="font-medium">
              Dla firm
            </Button>
          </Link>
          <Link href="/kup-bon">
            <Button className="gap-2">
              <Gift className="w-4 h-4" />
              Kup Bon
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  </header>
)

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-serif font-bold mb-4 inline-block">
              BeautyFinder
            </Link>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Twoja platforma do odkrywania najlepszych specjalistów beauty w Polsce.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Dla Klientów</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link href="/szukaj" className="hover:text-primary transition-colors">Znajdź salon</Link></li>
              <li><Link href="/kup-bon" className="hover:text-primary transition-colors">Kup bon podarunkowy</Link></li>
              <li><Link href="/jak-to-dziala" className="hover:text-primary transition-colors">Jak to działa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Dla Firm</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link href="/dla-firm" className="hover:text-primary transition-colors">Dołącz do nas</Link></li>
              <li><Link href="/cennik" className="hover:text-primary transition-colors">Cennik</Link></li>
              <li><Link href="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Obserwuj nas</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © 2024 BeautyFinder. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-sm text-foreground/60">
            <Link href="/regulamin" className="hover:text-primary transition-colors">Regulamin</Link>
            <Link href="/prywatnosc" className="hover:text-primary transition-colors">Polityka prywatności</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};