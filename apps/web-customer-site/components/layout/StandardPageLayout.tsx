"use client";

import { SiteHeader } from "./SiteHeader";

interface StandardPageLayoutProps {
  children: React.ReactNode;
}

export const StandardPageLayout = ({ children }: StandardPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      {/* Optional: Add Footer here if needed */}
    </div>
  );
};
