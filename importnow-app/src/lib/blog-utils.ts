import { marked } from "marked";

export const SITE_URL = "https://importnow.in";

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  hero_image: string | null;
  hero_image_alt: string | null;
  content: string;
  faq: BlogFAQItem[];
  category: string;
  read_time: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeFaq(faq: unknown): BlogFAQItem[] {
  if (!Array.isArray(faq)) return [];

  return faq.filter(
    (item): item is BlogFAQItem =>
      typeof item === "object" &&
      item !== null &&
      "question" in item &&
      "answer" in item &&
      typeof item.question === "string" &&
      typeof item.answer === "string"
  );
}

export function extractHeadings(content: string): TOCItem[] {
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

export function markdownToHtml(content: string): string {
  let html = marked.parse(content, { async: false, gfm: true, breaks: true }) as string;

  html = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/g, (_match, level, attrs, inner) => {
    const rawText = inner.replace(/<[^>]*>/g, "");
    const id = slugify(rawText);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

  html = html.replace(
    /(?<!href="|src="|">|=")(https?:\/\/[^\s<)"]+)/g,
    '<a href="$1">$1</a>'
  );

  html = html.replace(
    /<a\s+(?!target=)([^>]*?)href="/g,
    '<a target="_blank" rel="noopener noreferrer" $1href="'
  );

  return html;
}

export function buildTableOfContents(post: BlogPost): TOCItem[] {
  const contentHeadings = extractHeadings(post.content);

  if (post.faq.length > 0) {
    return [
      ...contentHeadings,
      { id: "faq", text: "Frequently Asked Questions", level: "h2" },
    ];
  }

  return contentHeadings;
}

export function buildFaqSchema(post: BlogPost) {
  if (post.faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBlogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
