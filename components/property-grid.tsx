"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bed, Bath, Maximize, MapPin, Grid3X3, LayoutList, Heart } from "lucide-react"
import { allProperties } from "@/lib/data/properties"

export function PropertyGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          عرض <span className="font-medium text-foreground">{allProperties.length}</span> عقار
        </p>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="الترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="price-low">السعر: من الأقل</SelectItem>
              <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
              <SelectItem value="area">المساحة</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border bg-background p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-colors ${
                viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="عرض شبكي"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-colors ${
                viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="عرض قائمة"
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Grid/List */}
      <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
        {allProperties.map((property) => (
          <Card
            key={property.id}
            className={`overflow-hidden group hover:shadow-lg transition-shadow ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 shrink-0" : "aspect-[4/3]"}`}>
              <img
                src={property.images?.[0] || "/placeholder.svg"}
                alt={property.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 right-3" variant={property.type === "للبيع" ? "default" : "secondary"}>
                {property.type}
              </Badge>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(property.id)
                }}
                className={`absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors ${
                  favorites.includes(property.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
                aria-label={favorites.includes(property.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
              </button>
            </div>
            <div className={`flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
              <CardContent className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-lg">{property.title}</h3>
                  <Badge variant="outline" className="shrink-0">
                    {property.propertyType}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{property.area}م²</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="text-lg font-bold text-primary">{property.price.toLocaleString()} ريال</div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/realestate/${property.id}`}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
