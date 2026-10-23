import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Info, ExternalLink } from "lucide-react"

export default function RealEstatePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      <main className="py-8 pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">العقارات</h1>
            <p className="text-muted-foreground">تصفح جميع العقارات المتاحة واستخدم الفلاتر للعثور على ما يناسبك</p>
          </div>

          {/* Demo Notice */}
          <div className="mb-8 rounded-2xl border border-primary/25 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">تنبيه تجريبي:</strong> جميع العقارات والأسعار والبيانات المعروضة هنا افتراضية ولأغراض العرض فقط وليست حقيقية.
              </span>
            </div>
            <a
              href="https://www.osamamaalam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>لطلب خدمات التطوير: osamamaalam.com</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
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
