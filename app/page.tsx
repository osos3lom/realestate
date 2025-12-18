import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { HowItWorks } from "@/components/how-it-works"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedProperties />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
