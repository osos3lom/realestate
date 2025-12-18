import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyDetails } from "@/components/property-details"

const properties = [
  {
    id: "1",
    title: "شقة للبيع",
    type: "للبيع",
    propertyType: "شقة",
    location: "جدة - الحمدانية",
    bedrooms: 4,
    bathrooms: 3,
    area: 287,
    price: 229994,
    description:
      "شقة فاخرة للبيع في حي الحمدانية بجدة، تتميز بتصميم عصري وتشطيبات راقية. تحتوي على 4 غرف نوم واسعة، صالة كبيرة، ومطبخ مجهز بالكامل. موقع استراتيجي قريب من جميع الخدمات.",
    features: ["مواقف سيارات", "مصعد", "حراسة أمنية", "حديقة", "تكييف مركزي"],
    images: [
      "/modern-apartment-exterior.png",
      "/luxury-apartment-living-room.png",
      "/cozy-apartment-bedroom-interior.jpg",
    ],
    agent: {
      name: "أحمد العمري",
      phone: "0500000000",
      email: "ahmed@example.com",
    },
  },
  {
    id: "2",
    title: "شقة فاخرة",
    type: "للبيع",
    propertyType: "شقة",
    location: "جدة - المنار",
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    price: 200000,
    description:
      "شقة فاخرة بتشطيبات عالية الجودة في حي المنار. تتميز بإطلالة رائعة وموقع مميز قريب من المراكز التجارية والمدارس.",
    features: ["مواقف سيارات", "مصعد", "غرفة خادمة", "بلكونة"],
    images: ["/luxury-apartment-living-room.png", "/modern-apartment-exterior.png"],
    agent: {
      name: "محمد السعيد",
      phone: "0511111111",
      email: "mohammed@example.com",
    },
  },
  {
    id: "3",
    title: "فيلا عصرية",
    type: "للبيع",
    propertyType: "فيلا",
    location: "الرياض - النرجس",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    price: 1500000,
    description:
      "فيلا عصرية فخمة في حي النرجس بالرياض. تصميم معماري فريد مع مساحات واسعة وتشطيبات فاخرة. تحتوي على مسبح خاص وحديقة كبيرة.",
    features: ["مسبح خاص", "حديقة", "غرفة سائق", "مجلس خارجي", "جراج مغطى"],
    images: ["/modern-villa-exterior-white-architecture.jpg", "/luxury-villa-pool.png"],
    agent: {
      name: "خالد الشمري",
      phone: "0522222222",
      email: "khaled@example.com",
    },
  },
  {
    id: "4",
    title: "شقة للإيجار",
    type: "للإيجار",
    propertyType: "شقة",
    location: "الدمام - الفيصلية",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    price: 35000,
    description:
      "شقة مريحة للإيجار السنوي في حي الفيصلية بالدمام. موقع هادئ وقريب من جميع الخدمات الأساسية والمدارس والمستشفيات.",
    features: ["مواقف سيارات", "مصعد", "تكييف سبليت"],
    images: ["/cozy-apartment-bedroom-interior.jpg", "/family-apartment-living-room.png"],
    agent: {
      name: "سعد القحطاني",
      phone: "0533333333",
      email: "saad@example.com",
    },
  },
]

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

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
