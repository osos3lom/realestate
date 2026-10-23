"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Heart,
  RotateCcw,
  Building2,
  Building,
  Castle,
  Warehouse,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useRentalsStore } from "@/lib/store/rentals-store";
import {
  saudiCities,
  type PropertyType,
} from "@/lib/data/properties";
import { cn } from "@/lib/utils";

const propertyTypes: { type: PropertyType; label: string; icon: any }[] = [
  { type: "شقة", label: "شقة", icon: Building2 },
  { type: "فيلا", label: "فيلا", icon: Castle },
  { type: "دوبلكس", label: "دوبلكس", icon: Building },
  { type: "استوديو", label: "استوديو", icon: Warehouse },
  { type: "شاليه", label: "شاليه", icon: Sparkles },
];

const availableAmenities = [
  "مسبح",
  "حديقة",
  "مصعد",
  "تكييف",
  "واي فاي",
  "مواقف سيارات",
  "إطلالة بحرية",
  "مفروش بالكامل",
];

export function RentalsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const {
    listings,
    selectedPropertyTypes,
    togglePropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    amenities,
    toggleAmenity,
    favorites,
    resetFilters,
    setMapCenter,
    setMapZoom,
    setSearchQuery,
    searchQuery,
  } = useRentalsStore();

  const [activeTab, setActiveTab] = React.useState<"all" | "favorites">("all");

  const handleCityClick = (city: (typeof saudiCities)[0]) => {
    setMapCenter({ lat: city.lat, lng: city.lng });
    setMapZoom(city.zoom);
    setSearchQuery(city.name);
  };

  const handleTabChange = (tab: "all" | "favorites") => {
    setActiveTab(tab);
    if (tab === "favorites") {
      setSearchQuery("");
    }
  };

  return (
    <Sidebar side="right" collapsible="offcanvas" dir="rtl" className="border-l border-border" {...props}>
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground hover:text-primary transition-colors">
            <div className="size-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black">
              ع
            </div>
            <div>
              <span className="text-base font-bold">منصة عقارية</span>
              <span className="block text-[11px] font-normal text-muted-foreground">نسخة عرض تجريبية (Demo)</span>
            </div>
          </Link>

          <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/realestate">
              <span>القائمة</span>
              <ArrowRight className="size-3.5 rotate-180" />
            </Link>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-3 space-y-6 overflow-y-auto">
        {/* Navigation Tabs */}
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeTab === "all"}
                onClick={() => handleTabChange("all")}
                className="rounded-xl font-medium justify-between"
              >
                <div className="flex items-center gap-2">
                  <Home className="size-4" />
                  <span>جميع العقارات (تجريبي)</span>
                </div>
                <SidebarMenuBadge className="rounded-full px-2 text-[11px]">
                  {listings.length}
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeTab === "favorites"}
                onClick={() => handleTabChange("favorites")}
                className="rounded-xl font-medium justify-between"
              >
                <div className="flex items-center gap-2">
                  <Heart className="size-4 text-red-500" />
                  <span>المفضلة</span>
                </div>
                <SidebarMenuBadge className="rounded-full px-2 text-[11px] bg-red-500/10 text-red-500 font-bold">
                  {favorites.length}
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <Separator />

        {/* Quick City Navigation */}
        <SidebarGroup className="p-0 space-y-2">
          <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
            المدن السريعة
          </SidebarGroupLabel>
          <div className="flex flex-wrap gap-1.5">
            {saudiCities.map((city) => (
              <Button
                key={city.name}
                variant={searchQuery === city.name ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs rounded-lg px-2.5 gap-1"
                onClick={() => handleCityClick(city)}
              >
                <MapPin className="size-3" />
                <span>{city.name}</span>
              </Button>
            ))}
          </div>
        </SidebarGroup>

        <Separator />

        {/* Property Type Filter */}
        <SidebarGroup className="p-0 space-y-2.5">
          <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
            نوع العقار
          </SidebarGroupLabel>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(({ type, label, icon: Icon }) => {
              const isSelected = selectedPropertyTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all text-right",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </SidebarGroup>

        <Separator />

        {/* Price Range Slider */}
        <SidebarGroup className="p-0 space-y-3">
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
              السعر بالليلة (ر.س)
            </SidebarGroupLabel>
            <span className="text-xs font-bold text-primary">
              {priceRange[0]} - {priceRange[1]} ر.س
            </span>
          </div>

          <Slider
            min={100}
            max={1500}
            step={50}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(val) => setPriceRange([val[0], val[1]])}
            className="w-full"
          />
        </SidebarGroup>

        <Separator />

        {/* Bedrooms Count */}
        <SidebarGroup className="p-0 space-y-2.5">
          <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
            غرف النوم
          </SidebarGroupLabel>
          <div className="flex gap-1.5">
            {[null, 1, 2, 3, 4, 5].map((val) => {
              const isSelected = bedrooms === val;
              return (
                <Button
                  key={val === null ? "any" : val}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="flex-1 h-8 text-xs rounded-lg p-0"
                  onClick={() => setBedrooms(val)}
                >
                  {val === null ? "الكل" : `${val}+`}
                </Button>
              );
            })}
          </div>
        </SidebarGroup>

        {/* Bathrooms Count */}
        <SidebarGroup className="p-0 space-y-2.5">
          <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
            دورات المياه
          </SidebarGroupLabel>
          <div className="flex gap-1.5">
            {[null, 1, 2, 3, 4].map((val) => {
              const isSelected = bathrooms === val;
              return (
                <Button
                  key={val === null ? "any" : val}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="flex-1 h-8 text-xs rounded-lg p-0"
                  onClick={() => setBathrooms(val)}
                >
                  {val === null ? "الكل" : `${val}+`}
                </Button>
              );
            })}
          </div>
        </SidebarGroup>

        <Separator />

        {/* Amenities Checklist */}
        <SidebarGroup className="p-0 space-y-2.5">
          <SidebarGroupLabel className="text-xs font-semibold text-foreground px-0">
            المميزات والمرافق
          </SidebarGroupLabel>
          <div className="space-y-2">
            {availableAmenities.map((amenity) => {
              const isChecked = amenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    className="size-4 rounded"
                  />
                  <span>{amenity}</span>
                </label>
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / Reset Filters & Developer CTA */}
      <SidebarFooter className="p-4 border-t border-border space-y-2.5">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full gap-2 rounded-xl text-xs font-semibold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
        >
          <RotateCcw className="size-3.5" />
          <span>إعادة ضبط جميع الفلاتر</span>
        </Button>
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-2.5 text-[11px] text-center space-y-1">
          <p className="text-muted-foreground">جميع البيانات للعرض التجريبي فقط</p>
          <a
            href="https://www.osamamaalam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 font-bold text-primary hover:underline"
          >
            <span>لطلب خدمات التطوير: osamamaalam.com</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
