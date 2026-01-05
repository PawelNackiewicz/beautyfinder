import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoginForm, useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Spinner,
  Button,
} from "@/components";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && user?.isLoggedIn) {
      navigate({ to: "/dashboard" });
    }
  }, [isLoading, user, navigate]);

  const handleLogin = (email: string) => {
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
              <Button variant="ghost">Rozpocznij darmowy okres</Button>
            </Link>
            <Link to="/login">
              <Button variant="cta">Logowanie</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Beaution Manager
            </CardTitle>
            <CardDescription>
              Zaloguj się, aby zarządzać swoim salonem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleLogin} />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Wersja demonstracyjna - podaj dowolny email, aby się zalogować
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
