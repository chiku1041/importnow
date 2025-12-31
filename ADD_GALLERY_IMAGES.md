# How to Add Gallery Images

## Quick Steps

### 1. Upload Images to Supabase Storage

1. Go to your Supabase dashboard → **Storage** → `gallery-images` bucket
2. Click "Upload file"
3. Upload your image files (recommended: JPG/PNG, max 2MB each, optimized for web)
4. After upload, click on the image to view it
5. Copy the **Public URL** (it will look like: `https://[project-ref].supabase.co/storage/v1/object/public/gallery-images/filename.jpg`)

### 2. Add Image Records to Database

**Option A: Using Supabase Dashboard (Easiest)**

1. Go to **Table Editor** → `gallery_images`
2. Click "Insert" → "Insert row"
3. Fill in:
   - **title**: Image title (e.g., "Factory Visit")
   - **description**: Brief description (e.g., "On-site quality inspection in Shenzhen")
   - **image_url**: Paste the Public URL from step 1
   - **order**: Display order (0 = first, 1 = second, etc.)
4. Click "Save"
5. Repeat for each image

**Option B: Using SQL**

```sql
INSERT INTO gallery_images (title, description, image_url, "order")
VALUES 
  ('Factory Visit', 'On-site quality inspection in Shenzhen', 'https://[project-ref].supabase.co/storage/v1/object/public/gallery-images/factory-visit.jpg', 0),
  ('Supplier Meeting', 'Building relationships with manufacturers', 'https://[project-ref].supabase.co/storage/v1/object/public/gallery-images/supplier-meeting.jpg', 1),
  ('Quality Check', 'Pre-shipment inspection process', 'https://[project-ref].supabase.co/storage/v1/object/public/gallery-images/quality-check.jpg', 2);
```

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: Max 2MB per image
- **Dimensions**: 1200x900px or 4:3 aspect ratio (will be displayed at 320px width)
- **Optimization**: Compress images before uploading (use tools like TinyPNG, ImageOptim, or Squoosh)

## Updating Images

1. To update an image, go to **Table Editor** → `gallery_images`
2. Click on the row you want to edit
3. Update the fields and click "Save"

## Deleting Images

1. Go to **Table Editor** → `gallery_images`
2. Click the row you want to delete
3. Click the delete icon (trash can)
4. Also delete the file from **Storage** → `gallery-images` bucket if you want to free up space

