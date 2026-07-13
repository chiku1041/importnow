import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/structured-data";
import {
  SITE_URL,
  buildFaqSchema,
  buildTableOfContents,
  getBlogPostBySlug,
  getBlogPostUrl,
  getPublishedBlogSlugs,
  getRelatedBlogPosts,
  markdownToHtml,
  stripMarkdown,
} from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | ImportNow Blog",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.title;
  const description = stripMarkdown(post.excerpt);
  const url = getBlogPostUrl(post.slug);
  const image = post.hero_image ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "ImportNow",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      ...(image && {
        images: [
          {
            url: image,
            alt: post.hero_image_alt ?? post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.category, slug);
  const headings = buildTableOfContents(post);
  const htmlContent = markdownToHtml(post.content);
  const shareUrl = getBlogPostUrl(post.slug);
  const faqSchema = buildFaqSchema(post);
  const pageUrl = shareUrl;
  const description = stripMarkdown(post.excerpt);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: pageUrl },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: post.title,
    description,
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: post.title, url: pageUrl },
    ],
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: post.hero_image ?? undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ImportNow",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <BlogPostClient
        post={post}
        relatedPosts={relatedPosts}
        headings={headings}
        htmlContent={htmlContent}
        shareUrl={shareUrl}
      />
    </>
  );
}
