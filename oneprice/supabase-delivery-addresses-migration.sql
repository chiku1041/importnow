-- =============================================
-- DELIVERY ADDRESSES TABLE MIGRATION
-- =============================================
-- Run this SQL in your Supabase Dashboard SQL Editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- DELIVERY ADDRESSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.delivery_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_address TEXT NOT NULL,
    street TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on delivery_addresses
ALTER TABLE public.delivery_addresses ENABLE ROW LEVEL SECURITY;

-- Delivery addresses policies
-- For Clerk integration, allow all operations (app handles auth)
-- In production, set up Clerk JWT + Supabase RLS integration
DROP POLICY IF EXISTS "Allow all delivery address operations" ON public.delivery_addresses;
CREATE POLICY "Allow all delivery address operations" ON public.delivery_addresses
    FOR ALL USING (true) WITH CHECK (true);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_delivery_addresses_updated_at ON public.delivery_addresses;
CREATE TRIGGER update_delivery_addresses_updated_at
    BEFORE UPDATE ON public.delivery_addresses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_delivery_addresses_user_id ON public.delivery_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_delivery_addresses_is_default ON public.delivery_addresses(is_default);

-- =============================================
-- MIGRATION FOR EXISTING TABLES
-- Run these if the table already exists
-- =============================================

-- Add mobile_number column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'delivery_addresses' 
        AND column_name = 'mobile_number'
    ) THEN
        -- Add column as nullable first
        ALTER TABLE public.delivery_addresses 
        ADD COLUMN mobile_number TEXT;
        
        -- Set a placeholder for existing rows (users will need to update through UI)
        -- Using a clearly invalid value so it's obvious it needs updating
        UPDATE public.delivery_addresses 
        SET mobile_number = '0000000000' 
        WHERE mobile_number IS NULL;
        
        -- Make it NOT NULL after setting default values
        ALTER TABLE public.delivery_addresses 
        ALTER COLUMN mobile_number SET NOT NULL;
    END IF;
END $$;

-- Add unique constraint on user_id if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'delivery_addresses_user_id_key'
    ) THEN
        ALTER TABLE public.delivery_addresses 
        ADD CONSTRAINT delivery_addresses_user_id_key UNIQUE (user_id);
    END IF;
END $$;

