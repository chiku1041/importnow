'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Warehouse } from '@/types/database'

export function useWarehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWarehouses = useCallback(async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('warehouses')
      .select('*')
      .order('country', { ascending: true })
      .order('state', { ascending: true })
    
    if (error) {
      setError(error.message)
    } else {
      setWarehouses(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchWarehouses()
  }, [fetchWarehouses])

  // Group warehouses by country
  const warehousesByCountry = warehouses.reduce((acc, warehouse) => {
    if (!acc[warehouse.country]) {
      acc[warehouse.country] = []
    }
    acc[warehouse.country].push(warehouse)
    return acc
  }, {} as Record<string, Warehouse[]>)

  return {
    warehouses,
    warehousesByCountry,
    loading,
    error,
    refetch: fetchWarehouses,
  }
}

