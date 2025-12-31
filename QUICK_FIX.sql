-- ============================================
-- QUICK FIX: Add Gallery Images & Verify Setup
-- ============================================
-- Run this after uploading images to Storage
-- ============================================

-- 1. VERIFY TABLES EXIST
SELECT 
  'contacts' as table_name,
  COUNT(*) as row_count
FROM contacts
UNION ALL
SELECT 
  'gallery_images' as table_name,
  COUNT(*) as row_count
FROM gallery_images;

-- 2. CHECK RLS POLICIES
SELECT 
  tablename,
  policyname,
  cmd as operation,
  roles
FROM pg_policies 
WHERE tablename IN ('contacts', 'gallery_images')
ORDER BY tablename, policyname;

-- 3. ADD GALLERY IMAGES (REPLACE URLs WITH YOUR ACTUAL STORAGE URLs)
-- Get your image URLs from: Storage → gallery-images → Click image → Copy Public URL

-- Example (replace with your actual image URLs):
INSERT INTO gallery_images (title, description, image_url, "order")
VALUES 
  ('Factory Visit', 'On-site quality inspection in Shenzhen', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery-images/YOUR-IMAGE-1.jpg', 0),
  ('Supplier Meeting', 'Building relationships with manufacturers', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery-images/YOUR-IMAGE-2.jpg', 1),
  ('Quality Check', 'Pre-shipment inspection process', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery-images/YOUR-IMAGE-3.jpg', 2)
ON CONFLICT DO NOTHING;

-- 4. FIX CONTACT FORM POLICY (REQUIRED FOR FORM TO WORK)
-- This fixes the "new row violates row-level security policy" error
-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contacts;
DROP POLICY IF EXISTS "Public can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can insert" ON contacts;

-- Ensure RLS is enabled
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (form submissions from anyone)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all contacts (optional, for admin)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. VERIFY GALLERY IMAGES POLICY (FIX IF MISSING)
DROP POLICY IF EXISTS "Allow public reads" ON gallery_images;
CREATE POLICY "Allow public reads" ON gallery_images
  FOR SELECT
  TO anon
  USING (true);

-- 6. VIEW ALL GALLERY IMAGES
SELECT id, title, description, image_url, "order", created_at
FROM gallery_images
ORDER BY "order" ASC;

-- 7. TEST: VIEW RECENT CONTACT SUBMISSIONS
SELECT id, name, email, subject, created_at
FROM contacts
ORDER BY created_at DESC
LIMIT 5;

