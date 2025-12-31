# Supabase Setup Guide

This guide will help you set up Supabase for the ImportNow application to handle:
1. Gallery images storage and retrieval
2. Contact form submissions

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `importnow` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"
6. Wait for the project to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 3: Set Up Environment Variables

1. In the `importnow-app` directory, create a file named `.env.local`
2. Add the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the placeholder values with your actual Supabase credentials

## Step 4: Create Database Tables

### 4.1 Create Contacts Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Run the following SQL:

```sql
-- Create contacts table
CREATE TABLE contacts (
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

-- Create policy to allow inserts (form submissions)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click "Run" to execute the query

### 4.2 Create Gallery Images Table

1. In the SQL Editor, create a new query
2. Run the following SQL:

```sql
-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads (for displaying images)
CREATE POLICY "Allow public reads" ON gallery_images
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow authenticated users to manage
CREATE POLICY "Allow authenticated manage" ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

3. Click "Run" to execute the query

## Step 5: Set Up Storage for Gallery Images

### 5.1 Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `gallery-images`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
4. Click "Create bucket"

### 5.2 Set Storage Policies

1. Click on the `gallery-images` bucket
2. Go to **Policies** tab
3. Click "New Policy"
4. Select "For full customization" → "Create a policy from scratch"
5. Add the following policy:

**Policy Name**: `Allow public read access`
**Allowed operation**: SELECT
**Policy definition**:
```sql
bucket_id = 'gallery-images'
```

6. Click "Review" → "Save policy"

7. Create another policy for authenticated uploads:

**Policy Name**: `Allow authenticated uploads`
**Allowed operation**: INSERT
**Policy definition**:
```sql
bucket_id = 'gallery-images' AND auth.role() = 'authenticated'
```

8. Click "Review" → "Save policy"

## Step 6: Upload Gallery Images

### Option A: Using Supabase Dashboard

1. Go to **Storage** → `gallery-images` bucket
2. Click "Upload file"
3. Upload your images (recommended: JPG/PNG, optimized for web)
4. After uploading, copy the public URL of each image

### Option B: Using Supabase Client (Programmatic)

You can create an admin page or use the Supabase dashboard to insert image records.

### 6.1 Insert Image Records

1. Go to **Table Editor** → `gallery_images`
2. Click "Insert" → "Insert row"
3. Fill in the details:
   - **title**: e.g., "Factory Visit"
   - **description**: e.g., "On-site quality inspection in Shenzhen"
   - **image_url**: The public URL from Storage (format: `https://[project-ref].supabase.co/storage/v1/object/public/gallery-images/filename.jpg`)
   - **order**: Number for sorting (0, 1, 2, etc.)
4. Click "Save"
5. Repeat for all gallery images

## Step 7: Test the Setup

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Test the contact form:
   - Go to `/contact`
   - Fill out and submit the form
   - Check Supabase dashboard → **Table Editor** → `contacts` to see the submission

3. Test the gallery:
   - Go to the home page
   - Scroll to "Building Trust Through Action" section
   - Verify images load from Supabase

## Troubleshooting

### Images not loading?
- Check that the storage bucket is public
- Verify the image URLs are correct
- Check browser console for errors
- Ensure RLS policies allow public reads

### Contact form not submitting?
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure the `contacts` table exists and RLS policies are set
- Check Supabase logs in the dashboard

### Environment variables not working?
- Make sure `.env.local` is in the `importnow-app` directory
- Restart your development server after adding/changing env variables
- Verify variable names start with `NEXT_PUBLIC_`

## Next Steps

- Set up email notifications for new contact submissions (using Supabase Edge Functions)
- Add image optimization/compression
- Create an admin panel to manage gallery images
- Add analytics tracking for form submissions

## Security Notes

- The `anon` key is safe to use in client-side code
- RLS policies ensure only authorized operations are allowed
- Never commit `.env.local` to version control
- Consider setting up additional policies for production

