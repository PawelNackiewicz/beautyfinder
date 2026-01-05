import {
  createRootRoute,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuth } from "@/features/auth";
import { useEffect } from "react";
import { Spinner } from "@repo/ui/components";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/functions",
  "/pricing",
  "/contact",
];

const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!user?.isLoggedIn && !isPublicRoute) {
      navigate({ to: "/login" });
    } else if (user?.isLoggedIn && location.pathname === "/") {
      navigate({ to: "/dashboard" });
    }
  }, [user, isLoading, isPublicRoute, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <main className="flex-1 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-lg text-muted-foreground">Page not found</p>
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
