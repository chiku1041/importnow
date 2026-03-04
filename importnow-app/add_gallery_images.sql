-- ============================================
-- Add Gallery Images to Home Page
-- ============================================
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- Insert gallery images with titles and descriptions
INSERT INTO gallery_images (title, description, image_url, "order")
VALUES 
  ('Gallery Image 1', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/2024_09_10_08_25_IMG_3609.jpg', 0),
  ('Gallery Image 2', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/IMG_0773%20(1).jpg', 1),
  ('Gallery Image 3', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/IMG_0844.jpg', 2),
  ('Gallery Image 4', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/IMG_0910.jpg', 3),
  ('Gallery Image 5', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/IMG_3925.JPG', 4),
  ('Gallery Image 6', 'ImportNow gallery showcase', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery/IMG-20231215-WA0023.jpg', 5)
ON CONFLICT DO NOTHING;

-- Verify the images were added
SELECT id, title, description, image_url, "order", created_at
FROM gallery_images
ORDER BY "order" ASC;


