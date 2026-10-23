<div dir="rtl" align="right">

# 🏢 منصة العقارات (Realestate) — نسخة عرض تجريبية (Demo)

منصة عقارية عربية حديثة ومتكاملة مبنية باستخدام **Next.js 16** و **React 19**، تتيح للمستخدمين استكشاف العقارات المعروضة للبيع والإيجار في مختلف مدن المملكة العربية السعودية عبر خرائط تفاعلية متطورة وفلاتر بحث ذكية.

> [!IMPORTANT]
> **تنبيه هام (نسخة تجريبية / Demo):**
> جميع العقارات، الأسعار، الصور، والأرقام المعروضة في هذا التطبيق هي **بيانات افتراضية لأغراض العرض التجريبي فقط وليست حقيقية**.
>
> 💼 **لطلب خدمات التطوير البرمجي أو بناء منصة عقارية مخصصة لمشروعك:**
> يرجى التواصل مع المطور عبر الموقع الرسمي: **[osamamaalam.com](https://www.osamamaalam.com/)**

---

## 🌐 العرض الحي (Live Demo)

- **الرابط المباشر (GitHub Pages)**: [osos3lom.github.io/realestate](https://osos3lom.github.io/realestate/)
- **لطلب خدمات التطوير**: [osamamaalam.com](https://www.osamamaalam.com/)

---

## ✨ المميزات الرئيسية

- **🗺️ خريطة تفاعلية متقدمة**: استعراض مواقع العقارات مباشرة على الخريطة باستخدام **MapLibre GL JS** مع أنماط خرائط متعددة (فاتح، داكن، شوارع، تضاريس، أقمار صناعية).
- **🏘️ مستكشف الإيجارات (`/rentals`)**: واجهة تفاعلية مخصصة للإيجارات تجمع بين الخريطة الحية، البطاقات المصغرة، الفلترة الفورية حسب السعر والمدينة ونوع العقار، وتحديد المعالم على الخريطة.
- **🔍 بحث وفلترة شاملة (`/realestate`)**: تصفح العقارات بنظام الشبكة أو القائمة مع إمكانية التصفية حسب نوع العقار (شقة، فيلا، دوبلكس، استوديو، شاليه)، المدينة، عدد الغرف، المساحة، والسعر.
- **📄 صفحات تفاصيل العقار (`/realestate/[id]`)**: معرض صور تفاعلي، مواصفات العقار الكاملة، المميزات، ومعلومات الوكيل العقاري مع نموذج تواصل مباشر.
- **🌙 الوضع الليلي والنهاري (Dark / Light Mode)**: دعم كامل لتبديل المظهر مع تصميم عصري بتأثيرات زجاجية (Glassmorphism).
- **🇸🇦 دعم كامل للغة العربية (RTL)**: تصميم مبني من الأساس لدعم اتجاه القراءة من اليمين إلى اليسار مع خط **Noto Sans Arabic**.
- **🔐 صفحات المصادقة التجريبية**: واجهات جاهزة لتسجيل الدخول، إنشاء حساب جديد، واستعادة كلمة المرور.

---

## 🛠️ التقنيات المستخدمة

| التقنية | الوصف |
| :--- | :--- |
| **Next.js 16 (App Router)** | إطار العمل الرئيسي مع دعم التصدير الثابت (`output: "export"`) للاستضافة على GitHub Pages |
| **React 19.2 & TypeScript** | لبناء واجهات مستخدم تفاعلية وموثوقة |
| **Tailwind CSS v4** | لتنسيق الواجهات المتجاوبة والحديثة |
| **shadcn/ui & Radix UI** | مكونات واجهة مستخدم عالية الجودة وقابلة للتخصيص |
| **MapLibre GL JS** | محرك الخرائط التفاعلية وعرض المواقع الجغرافية |
| **Zustand** | إدارة حالة التطبيق والفلاتر في صفحة الإيجارات التفاعلية |
| **Lucide React** | مكتبة الأيقونات العصرية |

---

## 📁 هيكل المشروع

```text
app/
├── auth/
│   ├── login/              # صفحة تسجيل الدخول (تجريبية)
│   ├── signup/             # صفحة إنشاء حساب جديد (تجريبية)
│   └── forgot-password/    # صفحة استعادة كلمة المرور (تجريبية)
├── realestate/
│   ├── [id]/               # صفحة تفاصيل العقار
│   └── page.tsx            # صفحة قائمة جميع العقارات
├── rentals/
│   ├── layout.tsx          # تخطيط مستكشف الإيجارات مع الشريط الجانبي
│   └── page.tsx            # صفحة خريطة الإيجارات التفاعلية
├── layout.tsx              # التخطيط الجذري وإعدادات الخط والمظهر
└── page.tsx                # الصفحة الرئيسية

components/
├── auth/                   # نماذج المصادقة
├── rentals/                # مكونات مستكشف الإيجارات (الخريطة، القائمة، الفلاتر، الشريط الجانبي)
├── ui/                     # مكونات واجهة المستخدم (shadcn/ui)
├── demo-banner.tsx         # شريط التنبيه بالنسخة التجريبية ورابط خدمات التطوير
├── header.tsx              # شريط التنقل العلوي
├── hero-section.tsx        # القسم الرئيسي مع الخريطة التفاعلية
├── control-panel.tsx       # لوحة الفلاتر السريعة
├── map-view.tsx            # مكون الخريطة في الصفحة الرئيسية
├── featured-properties.tsx # قسم العقارات المميزة
├── features-section.tsx    # قسم مميزات المنصة
├── how-it-works.tsx        # قسم خطوات الاستخدام
├── property-filters.tsx    # فلاتر صفحة العقارات
├── property-grid.tsx       # شبكة وقائمة عرض العقارات
├── property-details.tsx    # تفاصيل العقار ومعرض الصور
├── contact-form.tsx        # نموذج التواصل
└── footer.tsx              # تذييل الصفحة

lib/
├── data/properties.ts      # بيانات العقارات التجريبية والمدن السعودية
├── store/rentals-store.ts  # إدارة حالة خريطة وفلاتر الإيجارات (Zustand)
└── utils.ts                # الدوال المساعدة وإعداد المسارات
```

---

## 🚀 طريقة التشغيل محلياً

1. **استنساخ المستودع (Clone):**
   ```bash
   git clone https://github.com/osos3lom/realestate.git
   cd realestate
   ```

2. **تثبيت الحزم (Install Dependencies):**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **تشغيل خادم التطوير (Development Server):**
   ```bash
   npm run dev
   ```

4. **فتح المتصفح:**
   انتقل إلى الرابط [http://localhost:3000](http://localhost:3000)

---

## 📦 الاستضافة على GitHub Pages

المشروع مستضاف على **[osos3lom.github.io/realestate](https://osos3lom.github.io/realestate/)** ويتم نشره تلقائياً عبر **GitHub Actions** (`.github/workflows/deploy.yml`) باستخدام **Node.js 24**.

---

## 📑 جدول الصفحات والمسارات

| المسار | الوصف |
| :--- | :--- |
| `/` | الصفحة الرئيسية (الخريطة التفاعلية، العقارات المميزة، المميزات، تواصل معنا) |
| `/realestate` | تصفح جميع العقارات مع الفلاتر المتقدمة |
| `/realestate/[id]` | صفحة التفاصيل الكاملة للعقار والتواصل مع الوكيل |
| `/rentals` | مستكشف الإيجارات التفاعلي عبر الخريطة |
| `/auth/login` | تسجيل الدخول |
| `/auth/signup` | إنشاء حساب جديد |
| `/auth/forgot-password` | استعادة كلمة المرور |

</div>

---

<div dir="ltr" align="left">

## 🌍 English Summary

**Realestate (منصة العقارات)** is a modern Arabic RTL real estate and rental discovery platform built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **MapLibre GL JS**, and **Zustand**.

- **Live Demo**: [https://osos3lom.github.io/realestate/](https://osos3lom.github.io/realestate/)
- **Disclaimer**: All listings, prices, agents, and data across this application are **fictional and for demonstration purposes only**.
- **Developer Services**: If you would like to hire the developer or build a custom platform, please reach out via **[https://www.osamamaalam.com/](https://www.osamamaalam.com/)**.

### Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

## 📄 License

MIT

</div>
