'use client'

import { useUser as useClerkUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/database'

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      if (!isLoaded) return

      if (!clerkUser) {
        setProfile(null)
        setLoading(false)
        return
      }

      const supabase = createClient()
      
      // Try to get existing profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', clerkUser.id)
        .single()

      if (existingProfile) {
        setProfile(existingProfile)
      } else {
        // Create profile if it doesn't exist (new user)
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            clerk_id: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            full_name: clerkUser.fullName || '',
            role: 'user',
          })
          .select()
          .single()

        setProfile(newProfile)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [clerkUser, isLoaded])

  const isAdmin = profile?.role === 'admin'

  return { 
    user: clerkUser, 
    profile, 
    loading: !isLoaded || loading, 
    isAdmin 
  }
}
