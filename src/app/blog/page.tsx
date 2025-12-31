import { Metadata } from "next";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Insights on China-India Imports",
  description:
    "Expert insights, guides, and tips on importing from China to India. Learn about sourcing, quality control, logistics, and growing your import business.",
};

const featuredPost = {
  title: "The Complete Guide to Importing from China to India in 2025",
  excerpt:
    "Everything you need to know about starting your import journey — from finding suppliers to navigating customs and building lasting partnerships.",
  category: "Getting Started",
  readTime: "15 min read",
  date: "December 28, 2025",
  slug: "#",
};

const posts = [
  {
    title: "How to Avoid Common Import Risks",
    excerpt:
      "Learn about the most common pitfalls in China-India importing and how to protect your business from fraud, quality issues, and delays.",
    category: "Risk Management",
    readTime: "8 min read",
    date: "December 25, 2025",
    slug: "#",
  },
  {
    title: "Top 10 Products to Import from China in 2025",
    excerpt:
      "Discover the most profitable and trending product categories for Indian importers this year, backed by market data and trends.",
    category: "Market Insights",
    readTime: "10 min read",
    date: "December 20, 2025",
    slug: "#",
  },
  {
    title: "Understanding Customs Duties and Documentation",
    excerpt:
      "A comprehensive breakdown of Indian customs requirements, duty calculations, and essential documentation for smooth clearance.",
    category: "Compliance",
    readTime: "12 min read",
    date: "December 15, 2025",
    slug: "#",
  },
  {
    title: "Quality Inspection: What to Check Before Shipping",
    excerpt:
      "Pre-shipment inspection checklist and best practices to ensure you receive exactly what you ordered, every time.",
    category: "Quality Control",
    readTime: "7 min read",
    date: "December 10, 2025",
    slug: "#",
  },
  {
    title: "Building Long-Term Supplier Relationships",
    excerpt:
      "How to cultivate trust and loyalty with Chinese manufacturers for better prices, priority production, and reliable partnership.",
    category: "Supplier Relations",
    readTime: "9 min read",
    date: "December 5, 2025",
    slug: "#",
  },
  {
    title: "Sea Freight vs Air Freight: Making the Right Choice",
    excerpt:
      "Compare shipping methods, costs, timelines, and use cases to determine the best option for your import needs.",
    category: "Logistics",
    readTime: "6 min read",
    date: "December 1, 2025",
    slug: "#",
  },
];

const categories = [
  "All",
  "Getting Started",
  "Risk Management",
  "Market Insights",
  "Compliance",
  "Quality Control",
  "Logistics",
  "Supplier Relations",
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
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

        {/* Wave Divider */}
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

      {/* Featured Post */}
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
                  
                  <p className="text-[#666666] mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-[#888888] mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <Button variant="primary" asChild>
                    <Link href={featuredPost.slug} className="group">
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                
                <div className="hidden md:block">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-white/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-8 border-b border-[#e5e7eb]">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-[#0B1F33] text-white"
                    : "bg-[#F5F7FA] text-[#0B1F33] hover:bg-[#1F3A5F]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-8">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Card key={index} variant="default" className="flex flex-col">
                  {/* Thumbnail */}
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-[#0B1F33]/10 to-[#1F3A5F]/10 mb-4 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-[#0B1F33]/30" />
                  </div>
                  
                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-[#F5F7FA] rounded-full text-xs text-[#0B1F33] font-medium mb-3 w-fit">
                    {post.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#1F2933] mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-[#666666] mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-[#888888] pt-4 border-t border-[#e5e7eb]">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="secondary" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
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
            <p className="text-white/60 text-sm mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


