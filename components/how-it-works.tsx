"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, Search, MessageCircle, FileText, Home, DollarSign } from "lucide-react"

const userTypes = {
  agent: {
    title: "وسيط عقاري",
    steps: [
      {
        icon: UserCheck,
        title: "الخطوة 1: التسجيل",
        description: "سجل في المنصة كوسيط عقاري وأكمل ملفك الشخصي مع بيانات الترخيص",
      },
      {
        icon: FileText,
        title: "الخطوة 2: أضف عقاراتك",
        description: "أضف العقارات المتاحة لديك مع الصور والتفاصيل الكاملة والأسعار",
      },
      {
        icon: MessageCircle,
        title: "الخطوة 3: تواصل مع العملاء",
        description: "استقبل استفسارات العملاء وتواصل معهم لإتمام الصفقات بنجاح",
      },
    ],
  },
  buyer: {
    title: "مشتري",
    steps: [
      {
        icon: UserCheck,
        title: "الخطوة 1: التسجيل",
        description: "سجل في المنصة وحدد تفضيلاتك مثل نوع العقارات، المواقع، والميزانية",
      },
      {
        icon: Search,
        title: "الخطوة 2: تصفح العقارات",
        description: "استخدم الفلاتر الذكية للبحث عن العقارات، احفظ المفضلة، وحدد مواعيد المشاهدة",
      },
      {
        icon: MessageCircle,
        title: "الخطوة 3: تواصل وأتمم الصفقة",
        description: "تواصل مباشرة مع الوكلاء أو المالكين، احصل على مزيد من التفاصيل، وقدم عروضك",
      },
    ],
  },
  seller: {
    title: "بائع",
    steps: [
      {
        icon: UserCheck,
        title: "الخطوة 1: التسجيل",
        description: "سجل في المنصة كبائع وأكمل بيانات حسابك الشخصي",
      },
      {
        icon: Home,
        title: "الخطوة 2: أضف عقارك",
        description: "أضف تفاصيل عقارك مع صور عالية الجودة ووصف شامل",
      },
      {
        icon: DollarSign,
        title: "الخطوة 3: استقبل العروض",
        description: "استقبل العروض من المشترين المهتمين وتفاوض على أفضل سعر",
      },
    ],
  },
}

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState("buyer")

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-4 text-balance">
            كيف تستخدم منصتنا العقارية بسهولة؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            اتبع هذه الخطوات البسيطة للبدء والاستفادة القصوى، سواء كنت وكيلًا عقاريًا، مشتريًا، أو بائعًا.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-center mb-4 text-lg font-medium text-foreground">أنا:</div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="agent">وسيط عقاري</TabsTrigger>
                <TabsTrigger value="buyer">مشتري</TabsTrigger>
                <TabsTrigger value="seller">بائع</TabsTrigger>
              </TabsList>

              {Object.entries(userTypes).map(([key, { steps }]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                      <div key={index} className="relative rounded-2xl bg-card p-6 shadow-sm border">
                        <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
