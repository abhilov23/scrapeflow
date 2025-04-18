import DesktopSidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center px-6 py-4 h-[50px]">
          <h1 className="text-lg font-semibold">ScrapeFlow</h1>
        </header>
        <Separator />
        <main className="flex-1 overflow-auto">
          <div className="container py-4 text-accent-foreground">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
