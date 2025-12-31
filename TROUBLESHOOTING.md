# Troubleshooting Guide

## Images Not Showing on Home Page

### Issue: Images uploaded to Storage but not visible

**Problem**: You uploaded images to Supabase Storage, but they're not showing on the website.

**Solution**: Images need to be added to the `gallery_images` table, not just Storage.

### Steps to Fix:

1. **Get the Public URL from Storage**:
   - Go to Supabase Dashboard → Storage → `gallery-images` bucket
   - Click on each uploaded image
   - Copy the **Public URL** (looks like: `https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery-images/filename.jpg`)

2. **Add Records to Database**:
   - Go to **Table Editor** → `gallery_images`
   - Click "Insert" → "Insert row"
   - Fill in:
     - **title**: e.g., "Factory Visit"
     - **description**: e.g., "On-site quality inspection"
     - **image_url**: Paste the Public URL from step 1
     - **order**: 0, 1, 2, etc. (for display order)
   - Click "Save"
   - Repeat for each image

3. **Or Use SQL**:
```sql
INSERT INTO gallery_images (title, description, image_url, "order")
VALUES 
  ('Factory Visit', 'On-site quality inspection in Shenzhen', 'https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/gallery-images/your-image.jpg', 0);
```

4. **Refresh the website** - Images should now appear!

---

## Contact Form Not Working

### Issue: Form shows "Database connection not configured" error

**Check 1: Environment Variables**
- Verify `.env.local` exists in `importnow-app` directory
- Check it contains:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://wuxxveyozgvblvhisszq.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
  ```
- **Restart your dev server** after adding/changing env variables

**Check 2: Database Table Exists**
- Go to Supabase Dashboard → Table Editor
- Verify `contacts` table exists
- If not, run the SQL from `supabase_setup.sql`

**Check 3: RLS Policies**
- Go to Supabase Dashboard → Authentication → Policies
- Verify `contacts` table has a policy allowing INSERT for `anon` role
- If not, run this SQL:
```sql
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Check 4: Browser Console**
- Open browser DevTools (F12)
- Go to Console tab
- Look for any error messages
- Check Network tab for failed requests

---

## Quick Diagnostic Queries

Run these in Supabase SQL Editor to check your setup:

### Check if tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contacts', 'gallery_images');
```

### Check gallery images:
```sql
SELECT * FROM gallery_images ORDER BY "order";
```

### Check contacts (recent submissions):
```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

### Check RLS policies:
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename IN ('contacts', 'gallery_images');
```

---

## Common Issues

### 1. "order" column error
- The `order` column is a reserved keyword in SQL
- Always use quotes: `"order"` in queries
- The setup SQL already handles this correctly

### 2. Images show as broken
- Verify the image_url is the full Public URL from Storage
- Check the bucket is set to "Public"
- Verify storage policies allow public reads

### 3. Form submission fails silently
- Check browser console for errors
- Verify RLS policies allow anonymous inserts
- Check Supabase logs in dashboard

### 4. Environment variables not loading
- File must be named exactly `.env.local`
- Must be in `importnow-app` directory (not parent)
- Variables must start with `NEXT_PUBLIC_`
- **Restart dev server** after changes

---

## Still Not Working?

1. **Check Supabase Dashboard Logs**:
   - Go to Logs → API Logs
   - Look for errors when submitting form or loading images

2. **Verify API Keys**:
   - Go to Settings → API
   - Make sure you're using the `anon` public key (not service_role)

3. **Test Direct Connection**:
   - Open browser console
   - Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
   - Should show your Supabase URL

4. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

