import Link from "next/link"
import { Building2, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">realestate</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              نعمل على تحويل قطاع العقار من خلال ربط المستثمرين والمسوّقين والبائعين والمشترين على منصة واحدة.
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://instagram.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/realestate" className="text-muted-foreground hover:text-primary transition-colors">
                  العقارات
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  المميزات
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">الحساب</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  إنشاء حساب
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} realestate</p>
        </div>
      </div>
    </footer>
  )
}
