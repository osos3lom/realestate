"use client"

import { useState } from "react"
import { Info, ExternalLink, X } from "lucide-react"

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      dir="rtl"
      className="fixed bottom-3 left-3 right-3 md:left-auto md:right-4 md:max-w-md z-50 rounded-2xl bg-card/95 text-card-foreground backdrop-blur-md border border-primary/30 shadow-2xl p-3.5 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary mt-0.5">
          <Info className="h-4 w-4" />
        </div>
        <div className="flex-1 text-xs leading-relaxed">
          <p className="font-bold text-foreground mb-0.5">نسخة عرض تجريبية (Demo)</p>
          <p className="text-muted-foreground">
            جميع العقارات والبيانات والأرقام في هذا الموقع افتراضية ولأغراض العرض فقط وليست حقيقية. لطلب خدمات التطوير أو بناء منصة مماثلة:
          </p>
          <a
            href="https://www.osamamaalam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 font-bold text-primary hover:underline"
          >
            <span>تواصل مع المطور عبر osamamaalam.com</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="إغلاق التنبيه"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
