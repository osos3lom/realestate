import { Building2, TrendingUp, Users, Shield, Globe, Zap } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "فرص استثمار",
    description: "اكتشف أفضل الفرص الاستثمارية العقارية في مختلف المدن",
  },
  {
    icon: Building2,
    title: "تسويق العقار",
    description: "روّج لعقاراتك وصل لآلاف المشترين المحتملين بسهولة",
  },
  {
    icon: Users,
    title: "البحث عن مسكن",
    description: "ابحث عن منزل أحلامك باستخدام فلاتر متقدمة ودقيقة",
  },
  {
    icon: Shield,
    title: "معاملات آمنة",
    description: "نضمن أمان جميع المعاملات والتواصل بين الأطراف",
  },
  {
    icon: Globe,
    title: "تغطية واسعة",
    description: "عقارات في جميع مدن المملكة العربية السعودية",
  },
  {
    icon: Zap,
    title: "تجربة سريعة",
    description: "واجهة سهلة الاستخدام وسريعة للعثور على ما تبحث عنه",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-4 text-balance">منصة عمار العالم</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            المنصة تقدم تجربة مستخدم فريدة توفر فرص استثمار وتسويق العقار والبحث عن مسكن
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-card p-8 shadow-sm border hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-card border p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">الرؤية في عمار</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                تتمثل رؤيتنا في إحداث ثورة في مجال العقارات من خلال الربط بين المستثمرين والمسوقين والبائعين والمشترين
                على منصة مبتكرة. نسعى جاهدين لتبسيط المعاملات العقارية وتعزيز الشفافية بين أصحاب المصلحة.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl bg-primary/5 p-8 text-center">
                <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary mb-4">
                  <Building2 className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="text-xl font-semibold text-foreground">عمار العالم</div>
                <div className="text-sm text-muted-foreground">@alalam_amar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
