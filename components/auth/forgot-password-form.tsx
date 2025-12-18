"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-semibold text-foreground">تم إرسال الرابط</h3>
        <p className="text-sm text-muted-foreground">
          تم إرسال رابط إعادة تعيين كلمة المرور إلى <strong>{email}</strong>. يرجى التحقق من بريدك الإلكتروني.
        </p>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setIsSubmitted(false)
            setEmail("")
          }}
        >
          إرسال مرة أخرى
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="reset-email">البريد الإلكتروني</Label>
        <Input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          "إرسال رابط إعادة التعيين"
        )}
      </Button>
    </form>
  )
}
