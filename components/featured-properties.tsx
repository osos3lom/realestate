import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"

const properties = [
  {
    id: "1",
    title: "شقة للبيع",
    type: "للبيع",
    location: "جدة - الحمدانية",
    bedrooms: 4,
    bathrooms: 3,
    area: 287,
    price: 229994,
    image: "/modern-apartment-exterior.png",
  },
  {
    id: "2",
    title: "شقة فاخرة",
    type: "للبيع",
    location: "جدة - المنار",
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    price: 200000,
    image: "/luxury-apartment-living-room.png",
  },
  {
    id: "3",
    title: "فيلا عصرية",
    type: "للبيع",
    location: "الرياض - النرجس",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    price: 1500000,
    image: "/modern-villa-exterior-white-architecture.jpg",
  },
  {
    id: "4",
    title: "شقة للإيجار",
    type: "للإيجار",
    location: "الدمام - الفيصلية",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    price: 35000,
    image: "/cozy-apartment-bedroom-interior.jpg",
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-4 text-balance">العقارات المميزة</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            اكتشف مجموعة مختارة من أفضل العقارات المتاحة في مختلف مدن المملكة
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3" variant={property.type === "للبيع" ? "default" : "secondary"}>
                  {property.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground text-lg mb-2">{property.title}</h3>
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
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/realestate">عرض جميع العقارات</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
