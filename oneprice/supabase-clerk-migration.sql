-- =============================================
-- CLERK MIGRATION SQL
-- =============================================
-- Run this SQL AFTER running the original schema to migrate to Clerk authentication
-- This adds clerk_id column and updates the schema to work with Clerk

-- Add clerk_id column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS clerk_id TEXT UNIQUE;

-- Make id column optional (auto-generated) and remove auth.users reference for new records
-- First, drop the foreign key constraint if it exists
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make id default to uuid_generate_v4() for new records
ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- Create index on clerk_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_id ON public.profiles(clerk_id);

-- Update orders table to allow external user IDs
-- First, drop the foreign key constraint
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Create a new policy that allows insert with any user_id for profiles with matching clerk_id
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete all orders" ON public.orders;

-- Drop warehouse policies (they use auth.uid() which doesn't work with Clerk)
DROP POLICY IF EXISTS "Anyone can view warehouses" ON public.warehouses;
DROP POLICY IF EXISTS "Admins can insert warehouses" ON public.warehouses;
DROP POLICY IF EXISTS "Admins can update warehouses" ON public.warehouses;
DROP POLICY IF EXISTS "Admins can delete warehouses" ON public.warehouses;

-- For Clerk integration, we'll use anon key with open policies
-- and handle authorization in the application code
-- In production, you can set up Clerk JWT + Supabase RLS integration

-- Profiles: Allow all operations (app handles auth)
CREATE POLICY "Allow all profile operations" ON public.profiles
    FOR ALL USING (true) WITH CHECK (true);

-- Orders: Allow all operations (app handles auth)
CREATE POLICY "Allow all order operations" ON public.orders
    FOR ALL USING (true) WITH CHECK (true);

-- Warehouses: Allow all operations (app handles auth)
CREATE POLICY "Allow all warehouse operations" ON public.warehouses
    FOR ALL USING (true) WITH CHECK (true);

-- Drop the old trigger for Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Optional: Create a function to sync profiles for existing users
-- This can be called manually to migrate existing Supabase users to Clerk
-- CREATE OR REPLACE FUNCTION migrate_user_to_clerk(old_user_id UUID, new_clerk_id TEXT)
-- RETURNS void AS $$
-- BEGIN
--     UPDATE public.profiles SET clerk_id = new_clerk_id WHERE id = old_user_id;
--     UPDATE public.orders SET user_id = (SELECT id FROM profiles WHERE clerk_id = new_clerk_id) WHERE user_id = old_user_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- =============================================
-- NOTES FOR PRODUCTION
-- =============================================
-- For production with proper RLS, consider setting up:
-- 1. Clerk JWT Template for Supabase
-- 2. Custom RLS policies using Clerk's sub claim
-- See: https://clerk.com/docs/integrations/databases/supabase

