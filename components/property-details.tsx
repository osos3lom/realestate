"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  User,
} from "lucide-react"

interface Property {
  id: string
  title: string
  type: string
  propertyType: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  price: number
  description: string
  features: string[]
  images: string[]
  agent: {
    name: string
    phone: string
    email: string
  }
}

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: `أنا مهتم بهذا العقار: ${property.title}`,
  })

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("تم إرسال رسالتك بنجاح! سيتواصل معك الوكيل قريباً.")
    setContactForm({ ...contactForm, name: "", phone: "" })
  }

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <Link href="/realestate" className="hover:text-primary transition-colors">
          العقارات
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-foreground">{property.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/9]">
            <img
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={property.title}
              className="h-full w-full object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-primary" : "bg-background/60"
                    }`}
                    aria-label={`صورة ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors ${
                  isFavorite ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
                aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
                aria-label="مشاركة"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <Badge className="absolute top-4 right-4" variant={property.type === "للبيع" ? "default" : "secondary"}>
              {property.type}
            </Badge>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`shrink-0 h-20 w-28 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Property Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-primary">{property.price.toLocaleString()} ريال</div>
                {property.type === "للإيجار" && <span className="text-sm text-muted-foreground">سنوياً</span>}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-4 border-y">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Bed className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">غرف نوم</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Bath className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">دورات مياه</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Maximize className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{property.area} م²</div>
                  <div className="text-sm text-muted-foreground">المساحة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>الوصف</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>المميزات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>تواصل مع الوكيل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Agent Info */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{property.agent.name}</div>
                  <div className="text-sm text-muted-foreground">وكيل عقاري</div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1" asChild>
                  <a href={`tel:${property.agent.phone}`}>
                    <Phone className="ml-2 h-4 w-4" />
                    اتصال
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={`mailto:${property.agent.email}`}>
                    <Mail className="ml-2 h-4 w-4" />
                    إيميل
                  </a>
                </Button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">الاسم</Label>
                  <Input
                    id="contact-name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">رقم الهاتف</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">الرسالة</Label>
                  <Textarea
                    id="contact-message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="ml-2 h-4 w-4" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
