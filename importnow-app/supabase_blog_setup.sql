-- ============================================
-- ImportNow Blog Posts Supabase Setup SQL
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. BLOG POSTS TABLE
-- ============================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Dinesh Seemakurthi',
  hero_image TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  read_time TEXT DEFAULT '5 min read',
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Allow public reads for published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated manage" ON blog_posts;

-- Create policy to allow public reads (only published posts)
CREATE POLICY "Allow public reads for published posts" ON blog_posts
  FOR SELECT
  TO anon
  USING (is_published = TRUE);

-- Create policy to allow authenticated users to manage all posts
CREATE POLICY "Allow authenticated manage" ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 2. BLOG SUBSCRIPTIONS TABLE (for newsletter)
-- ============================================

CREATE TABLE IF NOT EXISTS blog_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts for subscriptions" ON blog_subscriptions;
DROP POLICY IF EXISTS "Allow authenticated reads for subscriptions" ON blog_subscriptions;

-- Allow anyone to subscribe
CREATE POLICY "Allow public inserts for subscriptions" ON blog_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view subscriptions
CREATE POLICY "Allow authenticated reads for subscriptions" ON blog_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================

-- Index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Index on is_published for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- Index on is_featured for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON blog_posts(is_featured);

-- Index on category for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- ============================================
-- 4. AUTO-UPDATE TRIGGER
-- ============================================

-- Trigger to auto-update updated_at for blog_posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. SAMPLE BLOG POST (for testing)
-- ============================================

INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  author,
  hero_image,
  content,
  category,
  read_time,
  is_featured,
  is_published,
  published_at
) VALUES (
  'complete-guide-importing-china-india-2025',
  'The Complete Guide to Importing from China to India in 2025',
  'Everything you need to know about starting your import journey — from finding suppliers to navigating customs and building lasting partnerships.',
  'Dinesh Seemakurthi',
  '/Gemini_Generated_Image_5a2lkj5a2lkj5a2l (1).png',
  '## Getting Started with China Imports

Importing from China to India has become one of the most lucrative business opportunities for entrepreneurs and established businesses alike. With the right knowledge and approach, you can build a profitable import business that serves the growing Indian market.

Before diving into the specifics, it''s crucial to understand the fundamentals of international trade, the regulatory landscape, and the key players involved in the import-export ecosystem.

### Understanding the Basics

The first step in your importing journey is to understand what products are in demand, how the supply chain works, and what legal requirements you need to fulfill. India has specific regulations for importing goods from China, including customs duties, quality certifications, and documentation requirements.

Key considerations include:

- Product selection and market research
- Supplier identification and verification
- Pricing and negotiation strategies
- Quality control and inspection
- Shipping and logistics options

## Finding Reliable Suppliers

One of the most critical aspects of importing from China is finding reliable suppliers. The Chinese manufacturing ecosystem is vast, with suppliers ranging from large factories to small workshops.

### Online Marketplaces

Platforms like Alibaba, Made-in-China, and Global Sources are excellent starting points for finding suppliers. However, due diligence is essential—not all suppliers on these platforms are equally reliable.

### Trade Fairs

Attending trade fairs like the Canton Fair provides an opportunity to meet suppliers face-to-face, inspect product samples, and build relationships. This personal connection often leads to better terms and more reliable partnerships.

## Quality Control and Inspection

Quality control is non-negotiable when importing from China. Without proper inspection processes, you risk receiving substandard products that can damage your reputation and business.

### Pre-Shipment Inspection

Always conduct a pre-shipment inspection before the goods leave the factory. This inspection should verify:

- Product specifications and quality
- Packaging and labeling
- Quantity verification
- Documentation completeness

### Third-Party Inspection Services

Consider using third-party inspection services like SGS, Bureau Veritas, or specialized China-based inspection companies. These services provide unbiased quality assessments and detailed reports.

## Navigating Customs and Compliance

Understanding Indian customs procedures is essential for smooth imports. The documentation and compliance requirements can be complex, but proper preparation ensures hassle-free clearance.

### Essential Documents

Key documents required for importing include:

- Bill of Lading or Airway Bill
- Commercial Invoice
- Packing List
- Certificate of Origin
- Import License (if required)
- BIS/FSSAI certifications (for applicable products)

### Customs Duties and Taxes

Import duties vary by product category and are determined by the Harmonized System (HS) codes. Additionally, you''ll need to account for:

- Basic Customs Duty (BCD)
- Integrated Goods and Services Tax (IGST)
- Social Welfare Surcharge
- Anti-dumping duties (if applicable)

## Building Long-Term Partnerships

Success in importing isn''t just about finding cheap suppliers—it''s about building relationships that lead to consistent quality, better prices, and priority treatment.

### Communication Best Practices

Effective communication with Chinese suppliers involves:

- Clear and detailed product specifications
- Regular follow-ups and updates
- Understanding cultural differences
- Building trust through consistency

### Payment Terms and Negotiations

As relationships develop, you can negotiate better payment terms such as:

- Extended credit periods
- Lower minimum order quantities
- Better pricing for bulk orders
- Priority production scheduling

## Conclusion

Importing from China to India offers tremendous opportunities for those willing to invest time in learning the process and building the right relationships. Start small, learn from each shipment, and gradually scale your operations as you gain experience and confidence.

Remember, successful importing is a marathon, not a sprint. Focus on building sustainable practices that will serve your business well for years to come.',
  'Getting Started',
  '15 min read',
  TRUE,
  TRUE,
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- 
-- HOW TO ADD A NEW BLOG POST:
-- 
-- 1. Go to Supabase Dashboard → Table Editor → blog_posts
-- 2. Click "Insert row"
-- 3. Fill in the fields:
--    - slug: URL-friendly identifier (e.g., "my-new-post")
--    - title: Your blog post title
--    - excerpt: Short description (1-2 sentences)
--    - author: Author name
--    - hero_image: Image path or URL
--    - content: Full article in Markdown format
--    - category: Post category
--    - read_time: Estimated read time
--    - is_featured: TRUE to show in featured section
--    - is_published: TRUE to make it visible on the website
--    - published_at: Publication date
-- 
-- CONTENT FORMAT (Markdown):
-- 
-- ## Main Section Heading (H2)
-- 
-- Regular paragraph text goes here.
-- 
-- ### Sub-section Heading (H3)
-- 
-- More paragraph text.
-- 
-- - Bullet point 1
-- - Bullet point 2
-- - Bullet point 3
-- 
-- ============================================
