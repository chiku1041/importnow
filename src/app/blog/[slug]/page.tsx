"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  ArrowRight,
  Link as LinkIcon,
  Linkedin,
  Facebook,
  Twitter,
  ChevronDown,
  Check,
  Send,
  Loader2,
} from "lucide-react";

// Types
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  hero_image: string | null;
  content: string;
  category: string;
  read_time: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

// Utility function to slugify text for IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Extract headings from markdown content
function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length === 2 ? "h2" : "h3";
    const text = match[2].trim();
    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}

// Convert markdown to HTML with IDs on headings
function markdownToHtml(content: string): string {
  let html = content
    // Convert H2 headings
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = slugify(text);
      return `<h2 id="${id}" class="scroll-mt-24 text-2xl font-bold text-[#0B1F33] mt-12 mb-6">${text}</h2>`;
    })
    // Convert H3 headings
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = slugify(text);
      return `<h3 id="${id}" class="scroll-mt-24 text-xl font-bold text-[#0B1F33] mt-8 mb-4">${text}</h3>`;
    })
    // Convert paragraphs
    .replace(/^(?!<h[23]|<ul|<li|-\s)(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
    // Convert list items
    .replace(/^-\s+(.+)$/gm, '<li class="text-gray-700 ml-4">$1</li>')
    // Wrap consecutive list items in ul
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc pl-6 mb-4 space-y-2">${match}</ul>`);

  return html;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch blog post from Supabase
  useEffect(() => {
    async function fetchPost() {
      if (!supabase) {
        setError("Database not configured");
        setLoading(false);
        return;
      }

      try {
        // Fetch the main post
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (postError) {
          if (postError.code === "PGRST116") {
            setError("Blog post not found");
          } else {
            throw postError;
          }
          setLoading(false);
          return;
        }

        setPost(postData);

        // Fetch related posts (same category, exclude current post)
        const { data: relatedData } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("is_published", true)
          .eq("category", postData.category)
          .neq("slug", slug)
          .order("published_at", { ascending: false })
          .limit(2);

        if (relatedData) {
          setRelatedPosts(relatedData);
        }
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);
  const htmlContent = useMemo(() => (post ? markdownToHtml(post.content) : ""), [post]);

  // Scroll spy effect
  useEffect(() => {
    if (!htmlContent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Small delay to ensure DOM is updated
    const timeout = setTimeout(() => {
      const headingElements = document.querySelectorAll("h2[id], h3[id]");
      headingElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [htmlContent]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !post) return;

    setIsSubmitting(true);
    try {
      const { error: subError } = await supabase.from("blog_subscriptions").insert([
        {
          email,
          source: `Blog: ${post.title}`,
        },
      ]);

      if (subError && subError.code !== "23505") {
        // 23505 is unique violation - already subscribed
        throw subError;
      }

      setIsSubscribed(true);
      setEmail("");
    } catch (err: any) {
      console.error("Subscription error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#0B1F33] mx-auto mb-4" />
          <p className="text-[#666666]">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-4">
            {error || "Blog post not found"}
          </h1>
          <p className="text-[#666666] mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button variant="primary" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[75vh] md:h-[70vh] lg:h-[80vh] flex items-end"
        style={{
          backgroundImage: post.hero_image
            ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${post.hero_image})`
            : "linear-gradient(135deg, #0B1F33 0%, #1F3A5F 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-custom pb-12 md:pb-16 lg:pb-20 relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 max-w-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 mb-6">
            <span>Written by {post.author}</span>
            <span className="hidden sm:inline">•</span>
            <span>Published on {formatDate(post.published_at)}</span>
            <span className="hidden sm:inline">•</span>
            <span>{post.read_time}</span>
          </div>

          {/* Social Share Buttons - Glassmorphism */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Copy link"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </button>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-3">
              {/* Mobile: Collapsible Accordion */}
              <div className="lg:hidden mb-8">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F7FA] rounded-lg font-medium text-[#1F2933]"
                >
                  <span>Table of Contents</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${tocOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {tocOpen && (
                  <nav className="mt-2 bg-[#F5F7FA] rounded-lg p-4">
                    <ul className="space-y-2">
                      {headings.map((heading) => (
                        <li
                          key={heading.id}
                          className={heading.level === "h3" ? "ml-4" : ""}
                        >
                          <a
                            href={`#${heading.id}`}
                            onClick={() => setTocOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                              activeSection === heading.id
                                ? "bg-[#0B1F33]/10 text-[#0B1F33] font-semibold"
                                : "text-[#666666] hover:text-[#0B1F33] hover:bg-[#0B1F33]/5"
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                {activeSection === heading.id && (
                                  <span className="w-2 h-2 rounded-full bg-[#2E7F7A]" />
                                )}
                                {heading.text}
                              </span>
                              {activeSection === heading.id && (
                                <ArrowRight className="h-4 w-4" />
                              )}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>

              {/* Desktop: Sticky Sidebar */}
              <div className="hidden lg:block sticky top-24">
                <h4 className="text-sm font-semibold text-[#1F2933] uppercase tracking-wide mb-4">
                  Table of Contents
                </h4>
                <nav className="border-l-2 border-[#e5e7eb]">
                  <ul className="space-y-1">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={heading.level === "h3" ? "ml-4" : ""}
                      >
                        <a
                          href={`#${heading.id}`}
                          className={`block px-4 py-2 text-sm border-l-2 -ml-[2px] transition-all ${
                            activeSection === heading.id
                              ? "border-[#2E7F7A] bg-[#2E7F7A]/5 text-[#0B1F33] font-semibold"
                              : "border-transparent text-[#666666] hover:text-[#0B1F33] hover:border-[#0B1F33]/30"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              {activeSection === heading.id && (
                                <span className="w-2 h-2 rounded-full bg-[#2E7F7A] shrink-0" />
                              )}
                              {heading.text}
                            </span>
                            {activeSection === heading.id && (
                              <ArrowRight className="h-3 w-3 shrink-0" />
                            )}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-9">
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Share Section - Bottom of Article */}
              <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-[#666666]">
                    Share this article:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e5e7eb] text-[#666666] hover:border-[#0B1F33] hover:text-[#0B1F33] transition-all text-sm"
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </button>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e5e7eb] text-[#666666] hover:border-[#0B1F33] hover:text-[#0B1F33] transition-all"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e5e7eb] text-[#666666] hover:border-[#0B1F33] hover:text-[#0B1F33] transition-all"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e5e7eb] text-[#666666] hover:border-[#0B1F33] hover:text-[#0B1F33] transition-all"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F5F5F5] section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  className="bg-white border border-[#e5e7eb] rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 bg-[#F5F7FA] rounded-full text-xs text-[#0B1F33] font-medium mb-3">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-2 text-[#C56A2D] font-medium hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Form Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Get More Import Insights
            </h2>
            <p className="text-lg text-[#666666] mb-8">
              Subscribe to receive the latest guides, tips, and industry updates
              delivered directly to your inbox.
            </p>

            {isSubscribed ? (
              <div className="bg-[#F5F7FA] rounded-xl p-8">
                <div className="h-16 w-16 rounded-full bg-[#2E7F7A]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-[#2E7F7A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2933] mb-2">
                  You&apos;re subscribed!
                </h3>
                <p className="text-[#666666]">
                  Thank you for subscribing. Check your inbox for a confirmation email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="shrink-0"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-sm text-[#888888] mt-4">
              Page source: Blog: {post.title}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
