'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DeliveryAddress } from '@/types/database'

interface UseDeliveryAddressOptions {
  userId?: string
}

export function useDeliveryAddress({ userId }: UseDeliveryAddressOptions = {}) {
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeliveryAddress = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('delivery_addresses')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is acceptable
      setError(error.message)
    } else {
      setDeliveryAddress(data || null)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    
    fetchDeliveryAddress()
  }, [userId, fetchDeliveryAddress])

  const hasDeliveryAddress = !!deliveryAddress

  return {
    deliveryAddress,
    hasDeliveryAddress,
    loading,
    error,
    refetch: fetchDeliveryAddress,
  }
}
