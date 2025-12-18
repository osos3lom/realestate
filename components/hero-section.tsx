"use client"

import dynamic from "next/dynamic"
import { ControlPanel, type FilterState } from "@/components/control-panel"

const MapView = dynamic(() => import("@/components/map-view").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
})

// Sample data for cities and districts
const cities = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"]
const districts: { [city: string]: string[] } = {
  الرياض: ["العليا", "النخيل", "الملقا", "حطين", "الياسمين"],
  جدة: ["الحمراء", "الروضة", "الشاطئ", "المرجان", "البوادي"],
  الدمام: ["الفيصلية", "الشاطئ الغربي", "النور", "الجلوية"],
  "مكة المكرمة": ["العزيزية", "الشوقية", "النسيم", "الحجون"],
  "المدينة المنورة": ["قباء", "العوالي", "الحرم", "المناخة"],
}

// Sample property markers for the map
const propertyMarkers = [
  { id: 1, lng: 46.6753, lat: 24.7136, title: "فيلا فاخرة", price: "2,500,000 ر.س" },
  { id: 2, lng: 46.702, lat: 24.7285, title: "شقة حديثة", price: "850,000 ر.س" },
  { id: 3, lng: 46.65, lat: 24.69, title: "دوبلكس", price: "1,800,000 ر.س" },
  { id: 4, lng: 46.72, lat: 24.7, title: "استوديو", price: "450,000 ر.س" },
  { id: 5, lng: 46.66, lat: 24.74, title: "شقة عائلية", price: "1,200,000 ر.س" },
]

export function HeroSection() {
  const handleFilterChange = (filters: FilterState) => {
    console.log("Filters applied:", filters)
    // Here you would typically filter the properties and update markers
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Map Container - dynamically loaded */}
      <MapView />

      {/* Overlay gradient for better text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Control Panel - Top Right */}
      <ControlPanel cities={cities} districts={districts} onFilterChange={handleFilterChange} />

      {/* Hero Text - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10 max-w-lg space-y-4">
        <h1 className="text-3xl font-bold leading-tight text-white lg:text-5xl text-balance drop-shadow-lg">
          اكتشف عقارك المثالي على الخريطة
        </h1>
        <p className="text-lg text-white/90 drop-shadow-md text-pretty">
          استخدم الفلاتر للبحث عن أفضل العقارات في منطقتك
        </p>
      </div>

      {/* Stats Bar - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-around py-4 px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm text-white/70">عقار متاح</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-sm text-white/70">مستخدم نشط</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-white/70">مدينة</div>
          </div>
        </div>
      </div>

      {/* Custom marker styles */}
      <style jsx global>{`
        .property-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .property-marker:hover {
          transform: scale(1.2);
        }
        .marker-pin {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        .maplibregl-popup-content {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  )
}
