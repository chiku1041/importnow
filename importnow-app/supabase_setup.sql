-- ============================================
-- ImportNow Supabase Complete Setup SQL
-- ============================================
-- Run this entire file in Supabase SQL Editor
-- Make sure to run each section in order
-- ============================================

-- ============================================
-- 1. CONTACTS TABLE
-- ============================================

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contacts;

-- Create policy to allow public inserts (form submissions from anyone)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all contacts
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 2. GALLERY IMAGES TABLE
-- ============================================

-- Create gallery_images table for "Building Trust Through Action" section
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Allow public reads" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated manage" ON gallery_images;

-- Create policy to allow public reads (anyone can view gallery images)
CREATE POLICY "Allow public reads" ON gallery_images
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow authenticated users to manage (insert, update, delete)
CREATE POLICY "Allow authenticated manage" ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 3. CREATE STORAGE BUCKET FOR GALLERY IMAGES
-- ============================================
-- Note: Storage buckets must be created via Supabase Dashboard
-- Go to Storage → Create bucket → Name: "gallery-images" → Public: Yes
-- Then run the storage policies below

-- ============================================
-- 4. STORAGE POLICIES FOR GALLERY IMAGES BUCKET
-- ============================================
-- Run these AFTER creating the "gallery-images" bucket in Storage

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- Allow public read access to gallery-images bucket
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload to gallery-images bucket
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery-images');

-- Allow authenticated users to update/delete in gallery-images bucket
CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery-images')
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-images');

-- ============================================
-- 5. HELPER FUNCTIONS (OPTIONAL)
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at for gallery_images
DROP TRIGGER IF EXISTS update_gallery_images_updated_at ON gallery_images;
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. INDEXES FOR PERFORMANCE (OPTIONAL)
-- ============================================

-- Index on contacts created_at for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Index on gallery_images order for sorting
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images("order" ASC);

-- ============================================
-- 7. SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================
-- Uncomment and modify these if you want to insert sample data

-- Sample gallery image (replace image_url with your actual Supabase Storage URL)
-- INSERT INTO gallery_images (title, description, image_url, "order")
-- VALUES 
--   ('Factory Visit', 'On-site quality inspection in Shenzhen', 'https://[your-project-ref].supabase.co/storage/v1/object/public/gallery-images/factory-visit.jpg', 0),
--   ('Supplier Meeting', 'Building relationships with manufacturers', 'https://[your-project-ref].supabase.co/storage/v1/object/public/gallery-images/supplier-meeting.jpg', 1),
--   ('Quality Check', 'Pre-shipment inspection process', 'https://[your-project-ref].supabase.co/storage/v1/object/public/gallery-images/quality-check.jpg', 2);

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create storage bucket "gallery-images" in Supabase Dashboard (Storage section)
-- 2. Upload your gallery images to the bucket
-- 3. Insert image records into gallery_images table with the public URLs
-- 4. Test contact form submission
-- ============================================

