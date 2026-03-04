export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Tracking step numbers (1-8)
export type TrackingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// For backward compatibility - maps to tracking steps
export type OrderStatus = 
  | 'waiting_for_confirmation'      // Step 1
  | 'arrived_at_warehouse'          // Step 2
  | 'accepted_by_oneprice'          // Step 3
  | 'ready_to_dispatch'             // Step 4
  | 'in_transit'                    // Step 5
  | 'arrived_in_india'              // Step 6
  | 'custom_clearance'              // Step 7
  | 'dispatched_to_address'         // Step 8

// Tracking step configuration with past/present/future wording
export interface TrackingStepConfig {
  step: TrackingStep
  status: OrderStatus
  pastLabel: string
  presentLabel: string
  futureLabel: string
}

export const TRACKING_STEPS: TrackingStepConfig[] = [
  {
    step: 1,
    status: 'waiting_for_confirmation',
    pastLabel: 'Confirmation Received',
    presentLabel: 'Waiting for Confirmation',
    futureLabel: 'Confirmation',
  },
  {
    step: 2,
    status: 'arrived_at_warehouse',
    pastLabel: 'Arrived at OnePrice Warehouse',
    presentLabel: 'Shipment Arrived at OnePrice Warehouse',
    futureLabel: 'Arrival at Warehouse',
  },
  {
    step: 3,
    status: 'accepted_by_oneprice',
    pastLabel: 'Accepted by OnePrice',
    presentLabel: 'Shipment Accepted by OnePrice',
    futureLabel: 'Acceptance',
  },
  {
    step: 4,
    status: 'ready_to_dispatch',
    pastLabel: 'Ready to Dispatch',
    presentLabel: 'Shipment Ready to Dispatch',
    futureLabel: 'Dispatch Preparation',
  },
  {
    step: 5,
    status: 'in_transit',
    pastLabel: 'Transit Completed',
    presentLabel: 'In Transit',
    futureLabel: 'Transit',
  },
  {
    step: 6,
    status: 'arrived_in_india',
    pastLabel: 'Arrived in India',
    presentLabel: 'Arrived in India',
    futureLabel: 'Arrival in India',
  },
  {
    step: 7,
    status: 'custom_clearance',
    pastLabel: 'Custom Clearance Completed',
    presentLabel: 'Custom Clearance Pending',
    futureLabel: 'Custom Clearance',
  },
  {
    step: 8,
    status: 'dispatched_to_address',
    pastLabel: 'Delivered',
    presentLabel: 'Dispatched to Delivery Address',
    futureLabel: 'Dispatch to Address',
  },
]

// Helper to get step number from status
export function getStepFromStatus(status: OrderStatus): TrackingStep {
  const step = TRACKING_STEPS.find(s => s.status === status)
  return step?.step || 1
}

// Helper to get status from step number
export function getStatusFromStep(step: TrackingStep): OrderStatus {
  const config = TRACKING_STEPS.find(s => s.step === step)
  return config?.status || 'waiting_for_confirmation'
}

export type UserRole = 'user' | 'admin'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          clerk_id: string | null
          email: string | null
          full_name: string | null
          phone: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          id: string
          country: string
          state: string
          address: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          country: string
          state: string
          address: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          country?: string
          state?: string
          address?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string
          tracking_number: string
          warehouse_id: string
          box_content: string
          num_boxes: number
          shipment_value: number
          status: OrderStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tracking_number: string
          warehouse_id: string
          box_content: string
          num_boxes: number
          shipment_value: number
          status?: OrderStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tracking_number?: string
          warehouse_id?: string
          box_content?: string
          num_boxes?: number
          shipment_value?: number
          status?: OrderStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      delivery_addresses: {
        Row: {
          id: string
          user_id: string
          full_address: string
          street: string
          area: string
          city: string
          state: string
          pincode: string
          mobile_number: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_address: string
          street: string
          area: string
          city: string
          state: string
          pincode: string
          mobile_number: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_address?: string
          street?: string
          area?: string
          city?: string
          state?: string
          pincode?: string
          mobile_number?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: OrderStatus
      user_role: UserRole
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type Profile = Tables<'profiles'>
export type Warehouse = Tables<'warehouses'>
export type Order = Tables<'orders'>
export type DeliveryAddress = Tables<'delivery_addresses'>
