'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Order, OrderStatus, Profile, DeliveryAddress } from '@/types/database'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

interface UseOrdersOptions {
  userId?: string
  isAdmin?: boolean
}

// Extended order type that includes user profile info for admin view
export interface OrderWithUser extends Order {
  profile?: Pick<Profile, 'id' | 'email' | 'full_name' | 'phone'> | null
  delivery_address?: DeliveryAddress | null
}

export function useOrders({ userId, isAdmin }: UseOrdersOptions = {}) {
  const [orders, setOrders] = useState<OrderWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    const supabase = createClient()
    
    // For admin, fetch orders and then get profile info
    if (isAdmin) {
      // First, get all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (ordersError) {
        setError(ordersError.message)
        setLoading(false)
        return
      }
      
      if (!ordersData || ordersData.length === 0) {
        setOrders([])
        setLoading(false)
        return
      }
      
      // Get unique user IDs
      const userIds = [...new Set(ordersData.map(order => order.user_id))]
      
      // Fetch profiles for all users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone')
        .in('id', userIds)
      
      // Fetch delivery addresses for all users
      const { data: addressesData } = await supabase
        .from('delivery_addresses')
        .select('*')
        .in('user_id', userIds)
      
      // Create maps for quick lookup
      const profileMap = new Map<string, Pick<Profile, 'id' | 'email' | 'full_name' | 'phone'>>()
      if (profilesData) {
        profilesData.forEach(profile => {
          profileMap.set(profile.id, profile)
        })
      }
      
      const addressMap = new Map<string, DeliveryAddress>()
      if (addressesData) {
        addressesData.forEach(address => {
          addressMap.set(address.user_id, address)
        })
      }
      
      // Merge orders with profile and address data
      const ordersWithUsers: OrderWithUser[] = ordersData.map(order => ({
        ...order,
        profile: profileMap.get(order.user_id) || null,
        delivery_address: addressMap.get(order.user_id) || null
      }))
      
      setOrders(ordersWithUsers)
    } else {
      // For regular users, just fetch their orders
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false })
      
      if (userId) {
        query = query.eq('user_id', userId)
      }
      
      const { data, error } = await query
      
      if (error) {
        setError(error.message)
      } else {
        setOrders(data || [])
      }
    }
    
    setLoading(false)
  }, [userId, isAdmin])

  useEffect(() => {
    if (!userId && !isAdmin) {
      setLoading(false)
      return
    }
    
    fetchOrders()
    
    // Set up realtime subscription
    const supabase = createClient()
    
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          ...((!isAdmin && userId) ? { filter: `user_id=eq.${userId}` } : {}),
        },
        (payload: RealtimePostgresChangesPayload<Order>) => {
          if (payload.eventType === 'INSERT') {
            setOrders((prev) => [payload.new as Order, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setOrders((prev) =>
              prev.map((order) =>
                order.id === (payload.new as Order).id ? (payload.new as Order) : order
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setOrders((prev) =>
              prev.filter((order) => order.id !== (payload.old as Order).id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe().then(() => {
        supabase.removeChannel(channel)
      })
    }
  }, [userId, isAdmin, fetchOrders])

  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    },
    {} as Record<OrderStatus, number>
  )

  return {
    orders,
    loading,
    error,
    statusCounts,
    refetch: fetchOrders,
  }
}

