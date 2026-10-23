import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Building2, ExternalLink } from "lucide-react"

export default function LoginPage() {
  return (
    <div dir="rtl" className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">realestate</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">تسجيل الدخول (نسخة تجريبية)</h1>
            <p className="text-muted-foreground text-sm">
              هذه الصفحة للعرض التجريبي فقط — يمكنك إدخال أي بيانات لتجربة الواجهة
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center text-xs text-muted-foreground">
            هل ترغب في تطوير منصة مماثلة؟{" "}
            <a
              href="https://www.osamamaalam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>تواصل مع المطور عبر osamamaalam.com</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
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
          <h2 className="text-3xl font-bold text-foreground mb-4">منصة realestate (Demo)</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            نموذج عرض تفاعلي لمنصة عقارية متكاملة. جميع العقارات والبيانات المعروضة في هذا الموقع افتراضية ولأغراض الاستعراض فقط.
          </p>
          <a
            href="https://www.osamamaalam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <span>لطلب خدمات التطوير: osamamaalam.com</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
