"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  X,
  Heart,
  Star,
  MapPin,
  ArrowUpDown,
  Grid3x3,
  List,
  ChevronDown,
  ChevronUp,
  Bed,
  Bath,
  Maximize,
  Sparkles,
} from "lucide-react";
import { useRentalsStore, type SortBy } from "@/lib/store/rentals-store";
import { type Property, propertyTypeLabels } from "@/lib/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "newest", label: "الأحدث" },
  { value: "price-low", label: "السعر: من الأقل للأعلى" },
  { value: "price-high", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
];

export function ListingsPanel() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const {
    selectedListingId,
    searchQuery,
    sortBy,
    favorites,
    selectListing,
    toggleFavorite,
    setSearchQuery,
    setSortBy,
    getFilteredListings,
    setMapCenter,
    setMapZoom,
  } = useRentalsStore();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const listings = getFilteredListings();

  React.useEffect(() => {
    if (selectedListingId && scrollContainerRef.current) {
      const el = document.getElementById(`listing-card-${selectedListingId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedListingId]);

  const handleListingClick = (listing: Property) => {
    if (selectedListingId === listing.id) {
      selectListing(null);
    } else {
      selectListing(listing.id);
      setMapCenter(listing.coordinates);
      setMapZoom(14);
    }
  };

  return (
    <div
      dir="rtl"
      className={cn(
        "absolute top-4 left-4 z-20 flex flex-col bg-background/95 backdrop-blur-md rounded-2xl border border-border shadow-2xl transition-all duration-300",
        isDesktop
          ? "w-[440px] max-h-[calc(100vh-2rem)]"
          : "inset-x-4 top-auto bottom-4 max-h-[60vh]",
        isCollapsed && (isDesktop ? "w-[440px] max-h-[70px] overflow-hidden" : "max-h-[64px] overflow-hidden")
      )}
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-border/60 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالمدينة، الحي، أو نوع العقار..."
              className="pr-9 pl-8 h-9 text-xs rounded-xl bg-muted/50 border-border/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="size-9 rounded-xl shrink-0 text-muted-foreground hover:text-foreground"
            title={isCollapsed ? "توسيع" : "تصغير"}
          >
            {isCollapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </Button>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground font-medium">
            تم العثور على <span className="font-bold text-foreground">{listings.length}</span> عقار
          </span>

          <div className="flex items-center gap-1.5">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs rounded-lg px-2.5">
                  <ArrowUpDown className="size-3.5" />
                  <span>
                    {sortOptions.find((o) => o.value === sortBy)?.label.split(":")[0] || "الترتيب"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(sortBy === option.value && "font-bold text-primary")}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-7 rounded-md"
                onClick={() => setViewMode("grid")}
                title="عرض شبكي"
              >
                <Grid3x3 className="size-3.5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="size-7 rounded-md"
                onClick={() => setViewMode("list")}
                title="عرض قائمة"
              >
                <List className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Scroll Area */}
      {!isCollapsed && (
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto p-4 flex-1 space-y-4 min-h-0 divide-y divide-border/30"
        >
          {listings.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-sm font-semibold text-foreground mb-1">لا توجد نتائج مطابقة</p>
              <p className="text-xs text-muted-foreground">جرب تعديل خيارات البحث أو إعادة ضبط الفلاتر.</p>
            </div>
          ) : (
            listings.map((listing) => {
              const isSelected = selectedListingId === listing.id;
              const isFav = favorites.includes(listing.id);

              return (
                <div
                  key={listing.id}
                  id={`listing-card-${listing.id}`}
                  onClick={() => handleListingClick(listing)}
                  className={cn(
                    "pt-4 first:pt-0 cursor-pointer transition-all duration-200 group rounded-xl p-2",
                    isSelected
                      ? "bg-primary/5 ring-2 ring-primary shadow-md"
                      : "hover:bg-muted/40"
                  )}
                >
                  {viewMode === "grid" ? (
                    // Grid Card Layout
                    <div className="space-y-3">
                      {/* Image Preview / Carousel */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                        {listing.images.length > 1 ? (
                          <Carousel className="w-full h-full">
                            <CarouselContent>
                              {listing.images.map((img, idx) => (
                                <CarouselItem key={idx}>
                                  <img
                                    src={img}
                                    alt={listing.title}
                                    className="w-full h-full object-cover aspect-[16/10]"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/modern-apartment-exterior.png";
                                    }}
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 size-7 bg-background/80 hover:bg-background" />
                            <CarouselNext className="right-2 size-7 bg-background/80 hover:bg-background" />
                          </Carousel>
                        ) : (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/modern-apartment-exterior.png";
                            }}
                          />
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
                          <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md text-[11px] border-none font-medium">
                            {propertyTypeLabels[listing.propertyType] || listing.propertyType}
                          </Badge>
                          {listing.isNew && (
                            <Badge className="bg-primary text-primary-foreground text-[10px] gap-1 font-bold">
                              <Sparkles className="size-3" /> جديد
                            </Badge>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                          className={cn(
                            "absolute top-2.5 left-2.5 size-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 z-10",
                            isFav
                              ? "bg-red-500 text-white shadow-md"
                              : "bg-black/40 text-white hover:bg-black/60"
                          )}
                          aria-label="المفضلة"
                        >
                          <Heart className={cn("size-4", isFav && "fill-current")} />
                        </button>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-amber-500">
                            <Star className="size-3.5 fill-current" />
                            <span>{listing.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2 line-clamp-1">
                          <MapPin className="size-3 text-primary shrink-0" />
                          <span>{listing.location}</span>
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground pb-2">
                          <span className="flex items-center gap-1">
                            <Bed className="size-3.5 text-muted-foreground" /> {listing.bedrooms} غرف
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Bath className="size-3.5 text-muted-foreground" /> {listing.bathrooms} حمام
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Maximize className="size-3.5 text-muted-foreground" /> {listing.area} م²
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/40">
                          <div>
                            <span className="text-base font-bold text-primary">
                              {(listing.pricePerNight || 350).toLocaleString("ar-SA")} ر.س
                            </span>
                            <span className="text-xs text-muted-foreground"> / ليلة</span>
                          </div>

                          <Link
                            href={`/realestate/${listing.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            عرض العقار ←
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List Card Layout (Compact)
                    <div className="flex gap-3">
                      <div className="relative size-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/modern-apartment-exterior.png";
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                          className={cn(
                            "absolute top-1 left-1 size-6 rounded-full flex items-center justify-center backdrop-blur-md",
                            isFav ? "bg-red-500 text-white" : "bg-black/50 text-white"
                          )}
                        >
                          <Heart className={cn("size-3", isFav && "fill-current")} />
                        </button>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h3 className="font-bold text-xs text-foreground truncate">{listing.title}</h3>
                            <span className="text-[11px] font-semibold text-amber-500 flex items-center shrink-0">
                              ★ {listing.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate mb-1">{listing.location}</p>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>{listing.bedrooms} غرف</span>
                            <span>•</span>
                            <span>{listing.area} م²</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-primary">
                            {(listing.pricePerNight || 350).toLocaleString("ar-SA")} ر.س
                            <span className="text-[10px] font-normal text-muted-foreground"> / ليلة</span>
                          </span>
                          <Link
                            href={`/realestate/${listing.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[11px] font-medium text-primary hover:underline"
                          >
                            التفاصيل
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
