import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "realestate - منصة العقارات",
  description: "اكتشف فرص استثمارية مميزة. سوّق عقاراتك بسهولة. ابحث عن منزل أحلامك.",
    generator: 'v0.app'
}

import { ThemeProvider } from "@/components/theme-provider"

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
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
