import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"

export default function RealEstatePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">العقارات</h1>
            <p className="text-muted-foreground">تصفح جميع العقارات المتاحة واستخدم الفلاتر للعثور على ما يناسبك</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside>
              <PropertyFilters />
            </aside>
            <section>
              <PropertyGrid />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
