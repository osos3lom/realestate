"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, SlidersHorizontal } from "lucide-react"

const cities = ["جميع المدن", "جدة", "الرياض", "الدمام", "مكة المكرمة", "المدينة المنورة"]
const propertyTypes = ["الكل", "شقة", "فيلا", "دوبلكس", "أرض", "عمارة"]

export function PropertyFilters() {
  const [listingType, setListingType] = useState<"all" | "sale" | "rent">("all")
  const [propertyType, setPropertyType] = useState("الكل")
  const [city, setCity] = useState("جميع المدن")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [areaRange, setAreaRange] = useState([0, 500])
  const [bedrooms, setBedrooms] = useState<string[]>([])

  const handleReset = () => {
    setListingType("all")
    setPropertyType("الكل")
    setCity("جميع المدن")
    setPriceRange([0, 2000000])
    setAreaRange([0, 500])
    setBedrooms([])
  }

  const toggleBedroom = (value: string) => {
    setBedrooms((prev) => (prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]))
  }

  return (
    <div className="rounded-2xl bg-card border p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">الفلاتر</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
          <RotateCcw className="ml-1 h-4 w-4" />
          مسح
        </Button>
      </div>

      {/* Listing Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">نوع الإعلان</Label>
        <div className="flex rounded-lg bg-muted p-1">
          <button
            onClick={() => setListingType("all")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              listingType === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setListingType("sale")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              listingType === "sale" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            للبيع
          </button>
          <button
            onClick={() => setListingType("rent")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              listingType === "rent" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            للإيجار
          </button>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">نوع العقار</Label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع العقار" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">الموقع</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المدينة" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">عدد الغرف</Label>
        <div className="flex flex-wrap gap-2">
          {["1", "2", "3", "4", "5", "6+"].map((num) => (
            <button
              key={num}
              onClick={() => toggleBedroom(num)}
              className={`h-10 w-10 rounded-lg border text-sm font-medium transition-colors ${
                bedrooms.includes(num)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Area Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">المساحة (م²)</Label>
          <span className="text-sm text-muted-foreground">
            {areaRange[0]} - {areaRange[1]}
          </span>
        </div>
        <Slider value={areaRange} onValueChange={setAreaRange} min={0} max={500} step={10} className="w-full" />
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">السعر (ريال)</Label>
          <span className="text-sm text-muted-foreground">
            {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={2000000}
          step={10000}
          className="w-full"
        />
      </div>

      <Button className="w-full">تطبيق الفلاتر</Button>
    </div>
  )
}
