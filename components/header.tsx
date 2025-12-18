"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center">
      <nav className="mx-4 mt-4 w-fit rounded-full bg-white/80 backdrop-blur-md border border-gray-200/40 shadow-lg">
        <ul className="flex flex-nowrap justify-center items-center list-none px-6 py-3 gap-2 md:gap-6">
          {/* Right side items (appear first in RTL) */}
          <li className="hidden md:block">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2"
              href="/#contact"
            >
              تواصل معنا
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2"
              href="/realestate"
            >
              العقارات
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2"
              href="/#features"
            >
              من نحن
            </Link>
          </li>
          <li className="hidden md:block">
            <Link className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2" href="/">
              الرئيسية
            </Link>
          </li>
          <li className="hidden md:block">
            <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-primary">
              <Link href="/auth/login">تسجيل الدخول</Link>
            </Button>
          </li>

          {/* Mobile menu button */}
          <li className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/40 shadow-lg p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              href="/realestate"
              className="text-sm font-medium text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              العقارات
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link
              href="/#properties"
              className="text-sm font-medium text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              العقارات المميزة
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              تواصل معنا
            </Link>
            <div className="flex items-center justify-end pt-3 border-t border-gray-200">
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
