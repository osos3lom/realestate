import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { Building2 } from "lucide-react"

export default function SignupPage() {
  return (
    <div dir="rtl" className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">عمار العالم</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground">انضم إلى منصة عمار العالم اليوم</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-2xl bg-primary">
              <Building2 className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">انضم إلى مجتمعنا</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            سجل الآن واستفد من جميع مميزات المنصة. سواء كنت مستثمراً، مسوقاً، بائعاً، أو مشترياً، نحن هنا لخدمتك.
          </p>
        </div>
      </div>
    </div>
  )
}
