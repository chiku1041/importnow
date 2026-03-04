-- =============================================
-- TRACKING STATUS MIGRATION
-- =============================================
-- 
-- FOR FRESH INSTALLS: 
--   Run supabase-schema.sql instead - it already has the new 8-step tracking system
--
-- FOR EXISTING DATABASES (migrating from old 4-status system):
--   Run this file in your Supabase Dashboard SQL Editor
--
-- =============================================

-- Step 1: Check if orders table exists before proceeding
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'orders') THEN
        -- Remove the old constraint
        ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
        
        -- Update existing order statuses to new values
        UPDATE public.orders SET status = 
            CASE status
                WHEN 'Waiting' THEN 'waiting_for_confirmation'
                WHEN 'In-Transit' THEN 'in_transit'
                WHEN 'In-Warehouse' THEN 'arrived_at_warehouse'
                WHEN 'Delivered' THEN 'dispatched_to_address'
                ELSE 'waiting_for_confirmation'
            END
        WHERE status IN ('Waiting', 'In-Transit', 'In-Warehouse', 'Delivered');
        
        -- Add the new constraint with all 8 tracking steps
        ALTER TABLE public.orders ADD CONSTRAINT orders_status_check 
            CHECK (status IN (
                'waiting_for_confirmation',    -- Step 1: Default when order is created
                'arrived_at_warehouse',        -- Step 2: Shipment arrived at OnePrice warehouse
                'accepted_by_oneprice',        -- Step 3: Shipment accepted by OnePrice
                'ready_to_dispatch',           -- Step 4: Shipment ready to dispatch
                'in_transit',                  -- Step 5: In transit
                'arrived_in_india',            -- Step 6: Arrived in India
                'custom_clearance',            -- Step 7: Custom clearance pending/completed
                'dispatched_to_address'        -- Step 8: Dispatched to delivery address
            ));
        
        -- Update default value for new orders
        ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'waiting_for_confirmation';
        
        RAISE NOTICE 'Migration completed successfully!';
    ELSE
        RAISE NOTICE 'Orders table does not exist. Please run supabase-schema.sql first for a fresh install.';
    END IF;
END $$;

-- =============================================
-- TRACKING STEPS REFERENCE
-- =============================================
-- 
-- Step 1: waiting_for_confirmation
--   - Past: "Confirmation Received"
--   - Present: "Waiting for Confirmation"
--   - Future: "Confirmation"
--
-- Step 2: arrived_at_warehouse
--   - Past: "Arrived at OnePrice Warehouse"
--   - Present: "Shipment Arrived at OnePrice Warehouse"
--   - Future: "Arrival at Warehouse"
--
-- Step 3: accepted_by_oneprice
--   - Past: "Accepted by OnePrice"
--   - Present: "Shipment Accepted by OnePrice"
--   - Future: "Acceptance"
--
-- Step 4: ready_to_dispatch
--   - Past: "Ready to Dispatch"
--   - Present: "Shipment Ready to Dispatch"
--   - Future: "Dispatch Preparation"
--
-- Step 5: in_transit
--   - Past: "Transit Completed"
--   - Present: "In Transit"
--   - Future: "Transit"
--
-- Step 6: arrived_in_india
--   - Past: "Arrived in India"
--   - Present: "Arrived in India"
--   - Future: "Arrival in India"
--
-- Step 7: custom_clearance
--   - Past: "Custom Clearance Completed"
--   - Present: "Custom Clearance Pending"
--   - Future: "Custom Clearance"
--
-- Step 8: dispatched_to_address
--   - Past: "Delivered"
--   - Present: "Dispatched to Delivery Address"
--   - Future: "Dispatch to Address"
--
