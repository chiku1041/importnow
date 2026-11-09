"use client";

import { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Calendar, Clock, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { stripMarkdown } from "@/lib/blog-utils";

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

export default function BlogListingClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const uniqueCategories = [...new Set(data.map((post) => post.category))];
          setCategories(["All", ...uniqueCategories]);

          const featured = data.find((post) => post.is_featured);
          if (featured) {
            setFeaturedPost(featured);
            setPosts(data.filter((post) => post.id !== featured.id));
          } else {
            setPosts(data);
          }
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #0B1F33 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container-custom section-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Blog</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Insights on <span className="text-[#0B1F33]">China-India Imports</span>
            </h1>

            <p className="text-xl text-[#666666]">
              Expert guides, tips, and industry insights to help you succeed in importing
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F5F7FA"
            />
          </svg>
        </div>
      </section>

      {loading && (
        <section className="bg-[#F5F7FA] section-padding">
          <div className="container-custom flex justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-[#0B1F33] mx-auto mb-4" />
              <p className="text-[#666666]">Loading articles...</p>
            </div>
          </div>
        </section>
      )}

      {!loading && featuredPost && (
        <section className="bg-[#F5F7FA] section-padding">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm font-semibold text-[#0B1F33] uppercase tracking-wide mb-4">
                Featured Article
              </h2>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#F5F7FA] rounded-full text-sm text-[#0B1F33] font-medium mb-4">
                      {featuredPost.category}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-[#666666] mb-6">{stripMarkdown(featuredPost.excerpt)}</p>

                    <div className="flex items-center gap-4 text-sm text-[#888888] mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.read_time}
                      </span>
                    </div>

                    <Button variant="primary" asChild>
                      <Link href={`/blog/${featuredPost.slug}`} className="group">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  <div className="hidden md:block">
                    {featuredPost.hero_image ? (
                      <div
                        className="aspect-video rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${featuredPost.hero_image})` }}
                      />
                    ) : (
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] flex items-center justify-center">
                        <BookOpen className="h-20 w-20 text-white/50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!loading && categories.length > 1 && (
        <section className="bg-white py-8 border-b border-[#e5e7eb]">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#0B1F33] text-white"
                      : "bg-[#F5F7FA] text-[#0B1F33] hover:bg-[#e5e7eb]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && (
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1F2933] mb-8">
                {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
              </h2>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-[#0B1F33]/20 mx-auto mb-4" />
                  <p className="text-[#666666]">
                    {posts.length === 0
                      ? "No articles yet. Check back soon!"
                      : "No articles in this category."}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card variant="default" className="flex flex-col h-full hover:shadow-lg transition-shadow">
                        {post.hero_image ? (
                          <div
                            className="aspect-video rounded-lg bg-cover bg-center mb-4"
                            style={{ backgroundImage: `url(${post.hero_image})` }}
                          />
                        ) : (
                          <div className="aspect-video rounded-lg bg-gradient-to-br from-[#0B1F33]/10 to-[#1F3A5F]/10 mb-4 flex items-center justify-center">
                            <BookOpen className="h-10 w-10 text-[#0B1F33]/30" />
                          </div>
                        )}

                        <span className="inline-block px-3 py-1 bg-[#F5F7FA] rounded-full text-xs text-[#0B1F33] font-medium mb-3 w-fit">
                          {post.category}
                        </span>

                        <h3 className="text-lg font-semibold text-[#1F2933] mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-[#666666] mb-4 line-clamp-3 flex-1">
                          {stripMarkdown(post.excerpt)}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#888888] pt-4 border-t border-[#e5e7eb]">
                          <span>{formatDate(post.published_at)}</span>
                          <span>{post.read_time}</span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {!loading && (
        <section className="bg-[#F5F7FA] section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center bg-[#0B1F33] rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Have Questions About Importing?
              </h2>
              <p className="text-white/90 mb-6">
                Speak with our team for expert guidance on China-India imports.
              </p>
              <Button variant="primary" size="lg" asChild>
                <a href="tel:+919989724320" className="group">
                  <Phone className="h-5 w-5" />
                  Contact Us — +91 9989724320
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest insights and tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                size="lg"
                className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA] shrink-0"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </>
  );
}
