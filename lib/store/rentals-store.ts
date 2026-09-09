import { create } from "zustand";
import {
  allProperties,
  type Property,
  type PropertyType,
} from "@/lib/data/properties";

export type SortBy =
  | "price-low"
  | "price-high"
  | "rating"
  | "newest";

export type MapStyle = "default" | "streets" | "outdoors" | "satellite";

export interface RentalsState {
  listings: Property[];
  searchQuery: string;
  selectedPropertyTypes: PropertyType[];
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[];
  sortBy: SortBy;
  selectedListingId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  mapStyle: MapStyle;
  userLocation: { lat: number; lng: number } | null;
  favorites: string[];
  setSearchQuery: (query: string) => void;
  togglePropertyType: (type: PropertyType) => void;
  setPriceRange: (range: [number, number]) => void;
  setBedrooms: (count: number | null) => void;
  setBathrooms: (count: number | null) => void;
  toggleAmenity: (amenity: string) => void;
  setSortBy: (sort: SortBy) => void;
  toggleFavorite: (listingId: string) => void;
  selectListing: (listingId: string | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setMapStyle: (style: MapStyle) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  getFilteredListings: () => Property[];
  getFavoriteListings: () => Property[];
  resetFilters: () => void;
}

const defaultPriceRange: [number, number] = [100, 1500];

export const useRentalsStore = create<RentalsState>((set, get) => ({
  listings: allProperties,
  searchQuery: "",
  selectedPropertyTypes: [],
  priceRange: defaultPriceRange,
  bedrooms: null,
  bathrooms: null,
  amenities: [],
  sortBy: "newest",
  selectedListingId: null,
  mapCenter: { lat: 24.7136, lng: 46.6753 }, // Riyadh center
  mapZoom: 11,
  mapStyle: "default",
  userLocation: null,
  favorites: ["1", "3", "9"],

  setSearchQuery: (query) => set({ searchQuery: query }),

  togglePropertyType: (type) =>
    set((state) => ({
      selectedPropertyTypes: state.selectedPropertyTypes.includes(type)
        ? state.selectedPropertyTypes.filter((t) => t !== type)
        : [...state.selectedPropertyTypes, type],
    })),

  setPriceRange: (range) => set({ priceRange: range }),
  setBedrooms: (count) => set({ bedrooms: count }),
  setBathrooms: (count) => set({ bathrooms: count }),

  toggleAmenity: (amenity) =>
    set((state) => ({
      amenities: state.amenities.includes(amenity)
        ? state.amenities.filter((a) => a !== amenity)
        : [...state.amenities, amenity],
    })),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleFavorite: (listingId) =>
    set((state) => {
      const isFav = state.favorites.includes(listingId);
      return {
        favorites: isFav
          ? state.favorites.filter((id) => id !== listingId)
          : [...state.favorites, listingId],
      };
    }),

  selectListing: (listingId) => set({ selectedListingId: listingId }),
  setMapCenter: (center) => set({ mapCenter: center }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  setMapStyle: (style) => set({ mapStyle: style }),
  setUserLocation: (location) => set({ userLocation: location }),

  getFilteredListings: () => {
    const state = get();
    let result = [...state.listings];

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.location.toLowerCase().includes(query) ||
          l.city.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.propertyType.toLowerCase().includes(query)
      );
    }

    if (state.selectedPropertyTypes.length > 0) {
      result = result.filter((l) =>
        state.selectedPropertyTypes.includes(l.propertyType)
      );
    }

    result = result.filter((l) => {
      const price = l.pricePerNight || 300;
      return price >= state.priceRange[0] && price <= state.priceRange[1];
    });

    if (state.bedrooms !== null) {
      result = result.filter((l) => l.bedrooms >= state.bedrooms!);
    }

    if (state.bathrooms !== null) {
      result = result.filter((l) => l.bathrooms >= state.bathrooms!);
    }

    if (state.amenities.length > 0) {
      result = result.filter((l) =>
        state.amenities.every((amenity) =>
          l.features.some((f) => f.includes(amenity) || amenity.includes(f))
        )
      );
    }

    switch (state.sortBy) {
      case "price-low":
        result.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  },

  getFavoriteListings: () => {
    const state = get();
    return state.listings.filter((l) => state.favorites.includes(l.id));
  },

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedPropertyTypes: [],
      priceRange: defaultPriceRange,
      bedrooms: null,
      bathrooms: null,
      amenities: [],
      sortBy: "newest",
    }),
}));
