"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Send, ExternalLink, Info } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      "هذا النموذج مخصص للعرض التجريبي فقط (Demo). لطلب خدمات التطوير أو التواصل الفعلي، يرجى زيارة: https://www.osamamaalam.com/"
    )
    setFormData({ name: "", email: "", phone: "", userType: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-4 text-balance">تواصل معنا</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              نموذج تواصل تجريبي — لطلب خدمات تطوير المواقع والتطبيقات تواصل مباشرة مع المطور
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                هذا النموذج للعرض التجريبي فقط. لطلب خدمات البرمجة والتطوير الخاصة بك، تواصل معي عبر موقعي الرسمي.
              </p>
            </div>
            <Button size="sm" asChild className="shrink-0 gap-1.5">
              <a href="https://www.osamamaalam.com/" target="_blank" rel="noopener noreferrer">
                <span>osamamaalam.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-sm border">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05XXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">أنا</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => setFormData({ ...formData, userType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المستخدم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">مشتري</SelectItem>
                  <SelectItem value="seller">بائع</SelectItem>
                  <SelectItem value="agent">وسيط عقاري</SelectItem>
                  <SelectItem value="investor">مستثمر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">الرسالة</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="ml-2 h-4 w-4" />
              إرسال الرسالة (تجريبي)
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
