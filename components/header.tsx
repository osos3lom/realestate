"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ExternalLink } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center">
      <nav className="mx-4 mt-4 w-fit rounded-full bg-background/90 dark:bg-card/90 backdrop-blur-md border border-border/60 shadow-xl transition-colors">
        <ul className="flex flex-nowrap justify-center items-center list-none px-5 py-2.5 gap-1.5 md:gap-4">
          {/* Right side items (appear first in RTL) */}
          <li className="hidden md:block">
            <Link
              className="text-xs lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5"
              href="/#contact"
            >
              تواصل معنا
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              className="text-xs lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5"
              href="/realestate"
            >
              العقارات
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              className="text-xs lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5"
              href="/rentals"
            >
              الإيجارات
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              className="text-xs lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5"
              href="/#features"
            >
              من نحن
            </Link>
          </li>
          <li className="hidden md:block">
            <Link className="text-xs lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5" href="/">
              الرئيسية
            </Link>
          </li>
          <li className="hidden md:block">
            <Button variant="ghost" size="sm" asChild className="text-foreground hover:text-primary text-xs lg:text-sm font-semibold">
              <Link href="/auth/login">تسجيل الدخول</Link>
            </Button>
          </li>
          <li className="hidden md:block">
            <Button size="sm" asChild className="rounded-full text-xs font-bold gap-1">
              <a href="https://www.osamamaalam.com/" target="_blank" rel="noopener noreferrer">
                <span>خدمات التطوير</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </li>
          <li className="flex items-center">
            <ThemeToggle />
          </li>

          {/* Mobile menu button */}
          <li className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-foreground">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-4 right-4 rounded-2xl bg-card/95 text-card-foreground backdrop-blur-md border border-border/60 shadow-xl p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-xs font-semibold py-2 px-3 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              href="/realestate"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              العقارات
            </Link>
            <Link
              href="/rentals"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الإيجارات
            </Link>
            <Link
              href="/#features"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link
              href="/#properties"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              العقارات المميزة
            </Link>
            <Link
              href="/#contact"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              تواصل معنا
            </Link>
            <a
              href="https://www.osamamaalam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary py-2 px-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>لطلب خدمات التطوير (osamamaalam.com)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <ThemeToggle />
              <Button size="sm" asChild>
                <Link href="/auth/login">تسجيل الدخول</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
