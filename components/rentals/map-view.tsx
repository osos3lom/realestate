"use client";

import * as React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { useRentalsStore } from "@/lib/store/rentals-store";
import { propertyTypeLabels } from "@/lib/data/properties";
import { withBasePath } from "@/lib/utils";

const MAP_STYLES: Record<string, any> = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  streets: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  outdoors: {
    version: 8,
    sources: {
      topo: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Tiles &copy; Esri &mdash; Sources: Esri, USGS, NOAA",
      },
    },
    layers: [{ id: "esri-topo", type: "raster", source: "topo", minzoom: 0, maxzoom: 19 }],
  },
  satellite: {
    version: 8,
    sources: {
      esri: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
      },
    },
    layers: [{ id: "esri-satellite", type: "raster", source: "esri", minzoom: 0, maxzoom: 19 }],
  },
};

export function RentalsMapView() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<Map<string, maplibregl.Marker>>(new Map());
  const popupRef = React.useRef<maplibregl.Popup | null>(null);
  const isAnimatingRef = React.useRef(false);
  const { resolvedTheme } = useTheme();

  const {
    mapCenter,
    mapZoom,
    mapStyle,
    setMapCenter,
    setMapZoom,
    selectListing,
    selectedListingId,
    getFilteredListings,
  } = useRentalsStore();

  const listings = getFilteredListings();

  const getMapStyle = React.useCallback(() => {
    if (mapStyle === "default") {
      return resolvedTheme === "dark" ? MAP_STYLES.dark : MAP_STYLES.light;
    }
    return MAP_STYLES[mapStyle] || MAP_STYLES.streets;
  }, [mapStyle, resolvedTheme]);

  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: getMapStyle(),
        center: [mapCenter.lng, mapCenter.lat],
        zoom: mapZoom,
        minZoom: 4,
        maxZoom: 18,
        attributionControl: false,
      });
    } catch (err) {
      console.error("MapLibre GL map initialization failed:", err);
      return;
    }

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    map.on("moveend", () => {
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        return;
      }
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapCenter({ lat: center.lat, lng: center.lng });
      setMapZoom(zoom);
    });

    mapRef.current = map;

    const handleResize = () => {
      map.resize();
    };
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => {
      map.resize();
    }, 150);

    const handleMapClick = (e: maplibregl.MapMouseEvent) => {
      if (popupRef.current) {
        const popupElement = popupRef.current.getElement();
        if (
          popupElement &&
          !popupElement.contains(e.originalEvent.target as Node)
        ) {
          const target = e.originalEvent.target as HTMLElement;
          if (!target.closest(".listing-marker-container")) {
            popupRef.current.remove();
            popupRef.current = null;
            selectListing(null);
          }
        }
      }
    };

    map.on("click", handleMapClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      map.off("click", handleMapClick);
      map.remove();
      mapRef.current = null;
    };
  }, [selectListing, getMapStyle]);

  // Update map style when theme or style preset changes
  React.useEffect(() => {
    if (!mapRef.current) return;
    try {
      mapRef.current.setStyle(getMapStyle());
    } catch (e) {
      console.warn("Failed to update map style:", e);
    }
  }, [mapStyle, resolvedTheme, getMapStyle]);

  // Update markers
  React.useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    listings.forEach((listing) => {
      const isSelected = selectedListingId === listing.id;

      const el = document.createElement("div");
      el.className = "listing-marker-container";
      const priceVal = listing.pricePerNight || Math.round(listing.price / 100);
      const priceText = `${priceVal.toLocaleString("ar-SA")} ر.س`;

      el.innerHTML = `
        <div class="relative cursor-pointer transition-all duration-200 ${
          isSelected ? "scale-110 z-20" : "hover:scale-105"
        }">
          <div class="px-3 py-1.5 rounded-full bg-card border-2 ${
            isSelected
              ? "border-primary bg-primary text-primary-foreground shadow-xl"
              : "border-border shadow-md hover:shadow-lg text-card-foreground hover:border-primary/50"
          } flex items-center justify-center gap-1 min-w-[70px] transition-colors">
            <span class="text-xs font-bold whitespace-nowrap">${priceText}</span>
          </div>
          ${
            isSelected
              ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping"></div>'
              : ""
          }
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();

        if (popupRef.current) {
          const currentPopup = popupRef.current;
          const currentLngLat = currentPopup.getLngLat();
          if (
            currentLngLat.lng === listing.coordinates.lng &&
            currentLngLat.lat === listing.coordinates.lat
          ) {
            currentPopup.remove();
            popupRef.current = null;
            selectListing(null);
            return;
          }
          currentPopup.remove();
        }

        if (!mapRef.current) return;

        const fallbackImg = withBasePath("/modern-apartment-exterior.png");
        const detailUrl = withBasePath(`/realestate/${listing.id}`);

        const popupContent = `
          <div dir="rtl" class="listing-popup-content font-sans">
            <div class="relative w-full h-48 rounded-t-xl overflow-hidden bg-muted">
              <img 
                src="${listing.images[0]}" 
                alt="${listing.title}"
                class="w-full h-full object-cover"
                onerror="this.src='${fallbackImg}'"
              />
              <button 
                class="close-popup-btn absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-md z-10"
                aria-label="إغلاق"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
                ${propertyTypeLabels[listing.propertyType] || listing.propertyType}
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-base text-foreground mb-1 line-clamp-1">${listing.title}</h3>
                  <p class="text-xs text-muted-foreground line-clamp-1">${listing.location}</p>
                </div>
                <div class="flex items-center gap-1 mr-2 shrink-0 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded text-xs font-bold">
                  ★ <span>${listing.rating.toFixed(1)}</span>
                </div>
              </div>
              <div class="flex items-center gap-3 text-xs text-muted-foreground my-3 border-y border-border/50 py-2">
                <span>${listing.bedrooms} غرف نوم</span>
                <span>•</span>
                <span>${listing.bathrooms} حمامات</span>
                <span>•</span>
                <span>${listing.area} م²</span>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div>
                  <span class="text-lg font-bold text-primary">${listing.pricePerNight || 350} ر.س</span>
                  <span class="text-xs text-muted-foreground"> / ليلة</span>
                </div>
                <a 
                  href="${detailUrl}" 
                  class="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  التفاصيل
                </a>
              </div>
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: [0, -15],
          closeButton: false,
          closeOnClick: false,
          className: "listing-popup",
          maxWidth: "340px",
        })
          .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
          .setHTML(popupContent)
          .addTo(mapRef.current!);

        const popupElement = popup.getElement();
        if (popupElement) {
          popupElement.style.zIndex = "1000";

          const closeButton = popupElement.querySelector(".close-popup-btn");
          if (closeButton) {
            closeButton.addEventListener("click", (e) => {
              e.stopPropagation();
              popup.remove();
              popupRef.current = null;
              selectListing(null);
            });
          }
        }

        popupRef.current = popup;
        selectListing(listing.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
        .addTo(mapRef.current!);

      markersRef.current.set(listing.id, marker);
    });
  }, [listings, selectedListingId, selectListing]);

  // Fly to listing when selectedListingId changes from other components
  const lastCenterRef = React.useRef({
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  });
  const lastZoomRef = React.useRef(mapZoom);

  React.useEffect(() => {
    if (!mapRef.current) return;

    const centerChanged =
      Math.abs(lastCenterRef.current.lat - mapCenter.lat) > 0.0001 ||
      Math.abs(lastCenterRef.current.lng - mapCenter.lng) > 0.0001;
    const zoomChanged = Math.abs(lastZoomRef.current - mapZoom) > 0.1;

    if (centerChanged || zoomChanged) {
      isAnimatingRef.current = true;
      mapRef.current.flyTo({
        center: [mapCenter.lng, mapCenter.lat],
        zoom: mapZoom,
        essential: true,
      });
      lastCenterRef.current = { lat: mapCenter.lat, lng: mapCenter.lng };
      lastZoomRef.current = mapZoom;
    }
  }, [mapCenter, mapZoom]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
