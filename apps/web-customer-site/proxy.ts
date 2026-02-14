import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Chronione ścieżki wymagające zalogowania
const isProtectedRoute = createRouteMatcher([
    "/profile(.*)",
    "/rezerwacja(.*)",
    "/dashboard(.*)",
    "/kup-bon(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // Jeśli użytkownik próbuje dostać się do chronionej ścieżki, wymuszamy logowanie
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Pomijamy pliki statyczne i Next.js internals
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Zawsze uruchamiaj dla API routes
        "/(api|trpc)(.*)",
    ],
};
