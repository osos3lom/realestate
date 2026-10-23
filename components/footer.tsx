import Link from "next/link"
import { Building2, ExternalLink, Info } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Demo Notice Box */}
        <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary mt-0.5">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">تنبيه: هذه المنصة نسخة عرض تجريبية (Demo)</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                جميع العقارات، الأسعار، الصور، وبيانات التواصل المعروضة في هذا الموقع هي بيانات افتراضية لأغراض استعراض التصميم والبرمجة فقط وليست حقيقية.
              </p>
            </div>
          </div>
          <a
            href="https://www.osamamaalam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <span>اطلب خدمات التطوير</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">realestate</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-4">
              نموذج تفاعلي لمنصة عقارية حديثة تربط المستثمرين والمسوّقين والبائعين والمشترين عبر خرائط تفاعلية متطورة.
            </p>
            <p className="text-sm text-muted-foreground">
              هل ترغب في بناء تطبيق أو منصة عقارية مخصصة لمشروعك؟ تواصل مع المطور عبر{" "}
              <a
                href="https://www.osamamaalam.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>osamamaalam.com</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
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
                <Link href="/rentals" className="text-muted-foreground hover:text-primary transition-colors">
                  خريطة الإيجارات
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  المميزات
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">الحساب والتطوير</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                  تسجيل الدخول (تجريبي)
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  إنشاء حساب (تجريبي)
                </Link>
              </li>
              <li>
                <a
                  href="https://www.osamamaalam.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>موقع المطور الرسمي</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-sm text-muted-foreground">
          <p>نسخة عرض تجريبية (Demo) — جميع البيانات افتراضية وليست حقيقية © {new Date().getFullYear()}</p>
          <p>
            تطوير وتصميم:{" "}
            <a
              href="https://www.osamamaalam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground hover:text-primary transition-colors underline"
            >
              Osama Maalam (osamamaalam.com)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
