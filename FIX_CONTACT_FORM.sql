-- ============================================
-- FIX CONTACT FORM RLS POLICY ERROR
-- ============================================
-- Run this in Supabase SQL Editor to fix:
-- "new row violates row-level security policy for table 'contacts'"
-- ============================================

-- Step 1: Drop all existing policies on contacts table
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contacts;
DROP POLICY IF EXISTS "Public can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can insert" ON contacts;

-- Step 2: Ensure RLS is enabled (required for policies to work)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policy to allow public inserts (anonymous users can submit contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Step 4: (Optional) Allow authenticated users to read contacts (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- VERIFY THE FIX
-- ============================================
-- Check that the policy was created:
SELECT 
  tablename,
  policyname,
  cmd as operation,
  roles
FROM pg_policies 
WHERE tablename = 'contacts'
ORDER BY policyname;

-- Test insert (should work now):
-- INSERT INTO contacts (name, email, subject, message)
-- VALUES ('Test User', 'test@example.com', 'Test Subject', 'Test message');
-- 
-- If successful, delete the test row:
-- DELETE FROM contacts WHERE email = 'test@example.com';

