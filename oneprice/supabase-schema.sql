-- =============================================
-- ONE PRICE (BUY IMPORT NOW) - DATABASE SCHEMA
-- =============================================
-- Run this SQL in your Supabase Dashboard SQL Editor
-- Make sure to enable Realtime on the 'orders' table after running this

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_count INTEGER;
BEGIN
    -- Count existing profiles
    SELECT COUNT(*) INTO user_count FROM public.profiles;
    
    -- First user becomes admin
    IF user_count = 0 THEN
        INSERT INTO public.profiles (id, email, role)
        VALUES (NEW.id, NEW.email, 'admin');
    ELSE
        INSERT INTO public.profiles (id, email, role)
        VALUES (NEW.id, NEW.email, 'user');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- WAREHOUSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on warehouses
ALTER TABLE public.warehouses ENABLE ROW LEVEL SECURITY;

-- Warehouses policies (everyone can read, only admins can modify)
CREATE POLICY "Anyone can view warehouses"
    ON public.warehouses FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert warehouses"
    ON public.warehouses FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update warehouses"
    ON public.warehouses FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete warehouses"
    ON public.warehouses FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_number TEXT NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES public.warehouses(id) ON DELETE RESTRICT,
    box_content TEXT NOT NULL,
    num_boxes INTEGER NOT NULL DEFAULT 1,
    shipment_value NUMERIC(10, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'waiting_for_confirmation' CHECK (status IN (
        'waiting_for_confirmation',    -- Step 1: Default when order is created
        'arrived_at_warehouse',        -- Step 2: Shipment arrived at OnePrice warehouse
        'accepted_by_oneprice',        -- Step 3: Shipment accepted by OnePrice
        'ready_to_dispatch',           -- Step 4: Shipment ready to dispatch
        'in_transit',                  -- Step 5: In transit
        'arrived_in_india',            -- Step 6: Arrived in India
        'custom_clearance',            -- Step 7: Custom clearance pending/completed
        'dispatched_to_address'        -- Step 8: Dispatched to delivery address
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
    ON public.orders FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own orders"
    ON public.orders FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
    ON public.orders FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all orders"
    ON public.orders FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete all orders"
    ON public.orders FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for orders updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_warehouse_id ON public.orders(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_warehouses_country ON public.warehouses(country);

-- =============================================
-- SAMPLE WAREHOUSE DATA (Optional)
-- =============================================
-- Uncomment and run this to add sample warehouses

-- INSERT INTO public.warehouses (country, state, address, notes) VALUES
-- ('China', 'Guangdong', '123 Import Street, Shenzhen, Guangdong 518000, China', 'Main China warehouse. Contact: +86 123 4567 8900'),
-- ('China', 'Shanghai', '456 Trade Avenue, Pudong District, Shanghai 200120, China', 'Shanghai warehouse for east coast suppliers'),
-- ('USA', 'California', '789 Commerce Blvd, Los Angeles, CA 90001, USA', 'US consolidation center'),
-- ('India', 'Maharashtra', '321 Business Park, Mumbai, Maharashtra 400001, India', 'India gateway warehouse');

-- =============================================
-- ENABLE REALTIME
-- =============================================
-- IMPORTANT: After running this SQL, go to your Supabase Dashboard:
-- 1. Navigate to Database > Replication
-- 2. Enable Realtime for the 'orders' table
-- OR run this command (requires Supabase CLI or direct DB access):

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

