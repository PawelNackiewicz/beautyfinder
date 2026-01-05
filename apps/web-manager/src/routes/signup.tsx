import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Spinner,
  Button,
  Input,
  Label,
} from "@/components";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { user, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && user?.isLoggedIn) {
      navigate({ to: "/dashboard" });
    }
  }, [isLoading, user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    // In demo mode, just log them in
    login(email);
    navigate({ to: "/dashboard" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-background to-secondary/10">
      <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-cta flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Beaution</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/signup">
              <Button variant="cta">Rozpocznij darmowy okres</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Logowanie</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen pt-20">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              Rozpocznij 14-dniowy trial
            </CardTitle>
            <CardDescription className="text-base">
              Bez karty kredytowej. Anuluj w dowolnym momencie.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jan Kowalski"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jan@przyklad.pl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salon">Nazwa salonu</Label>
                <Input
                  id="salon"
                  name="salon"
                  type="text"
                  placeholder="Salon Piękności"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+48 123 456 789"
                  required
                />
              </div>
              <Button type="submit" variant="cta" className="w-full" size="lg">
                Rozpocznij darmowy trial
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Wersja demonstracyjna - wypełnij formularz, aby rozpocząć
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Masz już konto?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Zaloguj się
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
