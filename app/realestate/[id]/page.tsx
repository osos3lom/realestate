import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyDetails } from "@/components/property-details"
import { getPropertyById } from "@/lib/data/properties"

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    return (
      <div dir="rtl" className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">العقار غير موجود</h1>
            <p className="text-muted-foreground">لم نتمكن من العثور على العقار المطلوب</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <PropertyDetails property={property} />
      </main>
      <Footer />
    </div>
  )
}
