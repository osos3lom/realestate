"use client"
import { useState, useCallback } from "react"

// Define the PlaceTypeData type inline

// Define the FilterState interface
export interface FilterState {
  type: "للبيع" | "للإيجار" | null
  city: string | null
  district: string | null
  bedroomsMin: number | null
  bedroomsMax: number | null
  bathroomsMin: number | null
  bathroomsMax: number | null
  areaMin: number | null
  areaMax: number | null
  priceMin: number | null
  priceMax: number | null
  condition: "new" | "used" | "under_construction" | null
  furnished: boolean | null
  amenities: string[]
  sortBy: "price" | "area" | "date" | "rating"
  sortOrder: "asc" | "desc"
}

type ControlPanelProps = {
  cities: string[]
  districts: { [city: string]: string[] }
  onFilterChange: (filters: FilterState) => void
}

export const ControlPanel = ({ cities, districts, onFilterChange }: ControlPanelProps) => {
  // State for popup visibility on small screens
  const [showPopup, setShowPopup] = useState(false)

  // Local state for editing filters
  const [pendingFilters, setPendingFilters] = useState<FilterState>({
    type: null,
    city: null,
    district: null,
    bedroomsMin: null,
    bedroomsMax: null,
    bathroomsMin: null,
    bathroomsMax: null,
    areaMin: null,
    areaMax: null,
    priceMin: null,
    priceMax: null,
    condition: null,
    furnished: null,
    amenities: [],
    sortBy: "date",
    sortOrder: "desc",
  })

  // Update local filter state only
  const updateFilter = useCallback(
    (key: keyof FilterState, value: unknown) => {
      const newFilters = { ...pendingFilters, [key]: value as FilterState[typeof key] }
      if (key === "city") {
        newFilters.district = null
      }
      if (key === "type") {
        if (newFilters.type === "للبيع") {
          newFilters.furnished = null
        } else if (newFilters.type === "للإيجار") {
          newFilters.condition = null
        }
      }
      setPendingFilters(newFilters)
    },
    [pendingFilters],
  )

  // Apply button handler
  const handleApply = () => {
    onFilterChange(pendingFilters)
    setShowPopup(false) // Optionally close popup on mobile
  }

  // Clear button handler
  const handleClear = () => {
    const clearedFilters: FilterState = {
      type: null,
      city: null,
      district: null,
      bedroomsMin: null,
      bedroomsMax: null,
      bathroomsMin: null,
      bathroomsMax: null,
      areaMin: null,
      areaMax: null,
      priceMin: null,
      priceMax: null,
      condition: null,
      furnished: null,
      amenities: [],
      sortBy: "date",
      sortOrder: "desc",
    }
    setPendingFilters(clearedFilters)
    onFilterChange(clearedFilters)
    setShowPopup(false)
  }

  // Extract panel content to a function for reuse
  function renderPanelContent() {
    const availableDistricts = pendingFilters.city ? districts[pendingFilters.city] || [] : []
    return (
      <div dir="rtl" className="w-full overflow-hidden">
        {/* Property Type Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 truncate">نوع الشقة</h3>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: null, label: "الكل" },
              { key: "للبيع", label: "للبيع" },
              { key: "للإيجار", label: "للإيجار" },
            ].map((option) => (
              <button
                key={option.key || "all"}
                onClick={() => updateFilter("type", option.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  pendingFilters.type === option.key
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location Filters */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 truncate">الموقع</h3>
          {/* City Filter */}
          <select
            value={pendingFilters.city || ""}
            onChange={(e) => updateFilter("city", e.target.value || null)}
            className="w-full mb-2 p-2 border rounded-md text-sm bg-white"
          >
            <option value="">جميع المدن</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {/* District Filter */}
          {availableDistricts.length > 0 && (
            <select
              value={pendingFilters.district || ""}
              onChange={(e) => updateFilter("district", e.target.value || null)}
              className="w-full p-2 border rounded-md text-sm bg-white"
            >
              <option value="">جميع الأحياء</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Property Specifications */}
        <div className="mb-4">
          {/* Bedrooms */}
          <div className="mb-3">
            <h3 className="text-sm font-medium mb-2 truncate">عدد الغرف</h3>
            <div className="flex gap-2">
              <select
                value={pendingFilters.bedroomsMin || ""}
                onChange={(e) => updateFilter("bedroomsMin", e.target.value ? Number.parseInt(e.target.value) : null)}
                className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
              >
                <option value="">من</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <select
                value={pendingFilters.bedroomsMax || ""}
                onChange={(e) => updateFilter("bedroomsMax", e.target.value ? Number.parseInt(e.target.value) : null)}
                className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
              >
                <option value="">إلى</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Area */}
          <div className="w-full">
            <h3 className="text-sm font-medium mb-2 truncate">المساحة (م²)</h3>
            <div className="flex gap-2 w-full">
              <input
                type="number"
                placeholder="من"
                value={pendingFilters.areaMin || ""}
                onChange={(e) => updateFilter("areaMin", e.target.value ? Number.parseInt(e.target.value) : null)}
                className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
              />
              <input
                type="number"
                placeholder="إلى"
                value={pendingFilters.areaMax || ""}
                onChange={(e) => updateFilter("areaMax", e.target.value ? Number.parseInt(e.target.value) : null)}
                className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-4 w-full">
          <h3 className="text-sm font-medium mb-2 truncate">السعر (ر.س)</h3>
          <div className="flex gap-2 w-full">
            <input
              type="number"
              placeholder="من"
              value={pendingFilters.priceMin || ""}
              onChange={(e) => updateFilter("priceMin", e.target.value ? Number.parseInt(e.target.value) : null)}
              className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
            />
            <input
              type="number"
              placeholder="إلى"
              value={pendingFilters.priceMax || ""}
              onChange={(e) => updateFilter("priceMax", e.target.value ? Number.parseInt(e.target.value) : null)}
              className="flex-1 min-w-0 p-2 border rounded-md text-sm bg-white"
            />
          </div>
        </div>

        {/* Conditional Filters Based on Type */}
        {pendingFilters.type === "للبيع" && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 truncate">حالة العقار</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { key: null, label: "الكل" },
                { key: "new", label: "جديد" },
                { key: "used", label: "مستعمل" },
                { key: "under_construction", label: "تحت الإنشاء" },
              ].map((option) => (
                <button
                  key={option.key || "all"}
                  onClick={() => updateFilter("condition", option.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    pendingFilters.condition === option.key
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {pendingFilters.type === "للإيجار" && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 truncate">الأثاث</h3>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: null, label: "الكل" },
                { key: true, label: "مفروش" },
                { key: false, label: "غير مفروش" },
              ].map((option) => (
                <button
                  key={option.key?.toString() || "all"}
                  onClick={() => updateFilter("furnished", option.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    pendingFilters.furnished === option.key
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Apply and Clear Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm font-medium"
          >
            تطبيق
          </button>
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm font-medium"
          >
            مسح الفلاتر
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="fixed top-20 right-4 z-30 p-2 rounded-full bg-primary text-white shadow-lg lg:hidden"
        onClick={() => setShowPopup(true)}
        aria-label="فتح الفلاتر"
        style={{ display: showPopup ? "none" : undefined }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      {/* Popup modal for small screens */}
      {showPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 lg:hidden">
          <div className="relative w-[90vw] max-w-md bg-white rounded-xl shadow-lg p-4 animate-fade-in max-h-[85vh] overflow-hidden">
            {/* Close button */}
            <button
              className="absolute top-3 left-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10"
              onClick={() => setShowPopup(false)}
              aria-label="إغلاق الفلاتر"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Panel content */}
            <div className="overflow-y-auto max-h-[80vh] pt-2">{renderPanelContent()}</div>
          </div>
        </div>
      )}

      {/* Always visible on large screens */}
      <div className="hidden lg:block absolute top-20 right-4 p-4 shadow-lg backdrop-blur-md rounded-xl z-20 w-[320px] border border-white/30 bg-white/95">
        {renderPanelContent()}
      </div>
    </>
  )
}

export default ControlPanel
