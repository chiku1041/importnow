'use client'

import { SignIn } from '@clerk/nextjs'
import { Logo } from '@/components/logo'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SessionExpiredBanner() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  
  if (reason !== 'session_expired') return null
  
  return (
    <div className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-800 dark:bg-amber-900/20">
      <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Session Expired</span>
      </div>
      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
        You were logged out due to inactivity. Please sign in again.
      </p>
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <Logo size="lg" />
        <Suspense fallback={null}>
          <SessionExpiredBanner />
        </Suspense>
        <SignIn 
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
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  )
}



