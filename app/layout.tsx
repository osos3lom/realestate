import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"

const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "realestate - منصة العقارات (نسخة تجريبية)",
  description:
    "نسخة عرض تجريبية لمنصة عقارية تفاعلية. جميع البيانات المعروضة افتراضية ولأغراض العرض فقط. لطلب خدمات التطوير: osamamaalam.com",
}

import { ThemeProvider } from "@/components/theme-provider"
import { DemoBanner } from "@/components/demo-banner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <DemoBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
