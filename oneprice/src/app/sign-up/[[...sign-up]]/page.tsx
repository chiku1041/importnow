'use client'

import { SignUp } from '@clerk/nextjs'
import { Logo } from '@/components/logo'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <Logo size="lg" />
        <div className="space-y-4">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-xl border border-primary/20",
                headerTitle: "text-2xl",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: "border-input hover:bg-accent",
                formButtonPrimary: "bg-primary hover:bg-primary/90",
                footerActionLink: "text-primary hover:text-primary/80",
              },
            }}
            fallbackRedirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
          <div className="max-w-md mx-auto p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-400 text-center">
            <strong>Note:</strong> Online payments coming soon. Please contact team via{' '}
            <a 
              href="https://wa.me/+919989724320" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              WhatsApp
            </a>{' '}
            for payment inquiries.
          </div>
        </div>
      </div>
    </div>
  )
}



