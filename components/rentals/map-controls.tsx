"use client";

import * as React from "react";
import {
  ZoomIn,
  ZoomOut,
  Navigation,
  Layers,
  Map as MapIcon,
  Mountain,
  Satellite,
  Circle,
  SlidersHorizontal,
} from "lucide-react";
import { useRentalsStore, type MapStyle } from "@/lib/store/rentals-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mapStyles: {
  id: MapStyle;
  name: string;
  icon: any;
  description: string;
}[] = [
  {
    id: "default",
    name: "افتراضي",
    icon: Circle,
    description: "يتطابق مع مظهر النظام",
  },
  {
    id: "streets",
    name: "شوارع",
    icon: MapIcon,
    description: "طرق وتفاصيل واضحة",
  },
  {
    id: "outdoors",
    name: "تضاريس",
    icon: Mountain,
    description: "معالم طبيعية",
  },
  {
    id: "satellite",
    name: "قمر صناعي",
    icon: Satellite,
    description: "صور جوية واقعية",
  },
];

export function MapControls() {
  const { mapZoom, setMapZoom, setMapCenter, setUserLocation, mapStyle, setMapStyle } =
    useRentalsStore();
  const { toggleSidebar } = useSidebar();

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 4));
  };

  const handleLocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          setMapZoom(15);
        },
        () => {
          alert("تعذر تحديد موقعك الحالي.");
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    } else {
      alert("خدمة تحديد الموقع غير مدعومة في متصفحك.");
    }
  };

  return (
    <div dir="rtl" className="absolute top-4 right-4 z-20 flex flex-col gap-2">
      {/* Sidebar Filter Trigger */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-background/95 backdrop-blur-md p-1 shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="size-9 rounded-lg"
              aria-label="تصفية النتائج"
            >
              <SlidersHorizontal className="size-4 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">الفلاتر والخيارات</TooltipContent>
        </Tooltip>
      </div>

      {/* Map Actions Box */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-background/95 backdrop-blur-md p-1 shadow-lg">
        {/* Style Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-lg"
              title="نمط الخريطة"
              aria-label="نمط الخريطة"
            >
              <Layers className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            {mapStyles.map((style) => {
              const Icon = style.icon;
              return (
                <DropdownMenuItem
                  key={style.id}
                  onClick={() => setMapStyle(style.id)}
                  className={cn(
                    "gap-2.5 text-xs cursor-pointer",
                    mapStyle === style.id && "bg-accent font-bold text-primary"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <div className="flex flex-col">
                    <span>{style.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {style.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Zoom In */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="size-9 rounded-lg"
            >
              <ZoomIn className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">تكبير</TooltipContent>
        </Tooltip>

        {/* Zoom Out */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="size-9 rounded-lg"
            >
              <ZoomOut className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">تصغير</TooltipContent>
        </Tooltip>

        {/* Locate */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLocate}
              className="size-9 rounded-lg text-primary"
            >
              <Navigation className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">موقعي الحالي</TooltipContent>
        </Tooltip>
      </div>

      {/* Theme Toggle */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-background/95 backdrop-blur-md p-1 shadow-lg">
        <ThemeToggle />
      </div>
    </div>
  );
}
