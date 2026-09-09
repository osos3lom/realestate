"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { RentalsSidebar } from "@/components/rentals/sidebar";

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      <SidebarProvider defaultOpen={false} className="h-full w-full !min-h-0 flex flex-1 flex-row overflow-hidden">
        <RentalsSidebar />
        <SidebarInset className="overflow-hidden relative h-full w-full flex-1">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
