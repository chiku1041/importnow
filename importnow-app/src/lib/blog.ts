import { supabase } from "@/lib/supabase";
import {
  type BlogPost,
  normalizeFaq,
} from "@/lib/blog-utils";

export {
  SITE_URL,
  buildFaqSchema,
  buildTableOfContents,
  getBlogPostUrl,
  markdownToHtml,
  stripMarkdown,
} from "@/lib/blog-utils";

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    ...(row as Omit<BlogPost, "faq">),
    faq: normalizeFaq(row.faq),
  };
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }

  return data?.map((post) => post.slug) ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error fetching blog post:", error);
    }
    return null;
  }

  return mapBlogPost(data);
}

export async function getRelatedBlogPosts(
  category: string,
  slug: string,
  limit = 2
): Promise<BlogPost[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("category", category)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return (data ?? []).map(mapBlogPost);
}
