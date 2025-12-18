"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة")
      return
    }

    if (!formData.agreeToTerms) {
      alert("يجب الموافقة على الشروط والأحكام")
      return
    }

    setIsLoading(true)

    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    router.push("/auth/login")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">الاسم الكامل</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="أدخل اسمك الكامل"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">البريد الإلكتروني</Label>
        <Input
          id="signup-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="05XXXXXXXX"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userType">نوع الحساب</Label>
        <Select
          value={formData.userType}
          onValueChange={(value) => setFormData({ ...formData, userType: value })}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع الحساب" />
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
        <Label htmlFor="signup-password">كلمة المرور</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="أدخل كلمة المرور"
            required
            disabled={isLoading}
            className="pl-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="أعد إدخال كلمة المرور"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
          disabled={isLoading}
          className="mt-1"
        />
        <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
          أوافق على{" "}
          <Link href="/terms" className="text-primary hover:underline">
            الشروط والأحكام
          </Link>{" "}
          و{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            سياسة الخصوصية
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جاري إنشاء الحساب...
          </>
        ) : (
          "إنشاء حساب"
        )}
      </Button>
    </form>
  )
}
