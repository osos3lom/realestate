"use client";

import * as React from "react";
import { RentalsMapView } from "@/components/rentals/map-view";
import { ListingsPanel } from "@/components/rentals/listings-panel";
import { MapControls } from "@/components/rentals/map-controls";

export default function RentalsPage() {
  return (
    <div className="relative h-full w-full overflow-hidden flex-1" suppressHydrationWarning>
      <RentalsMapView />
      <ListingsPanel />
      <MapControls />
    </div>
  );
}
