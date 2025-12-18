import Link from "next/link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Building2, ArrowRight } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">realestate</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">نسيت كلمة المرور؟</h1>
          <p className="text-muted-foreground">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>
        </div>

        <div className="rounded-2xl bg-card border p-8">
          <ForgotPasswordForm />
        </div>

        <p className="text-center">
          <Link href="/auth/login" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowRight className="ml-1 h-4 w-4" />
            العودة لتسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}
