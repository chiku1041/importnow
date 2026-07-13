import { Metadata } from "next";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { SITE_URL } from "@/lib/blog";
import BlogListingClient from "./BlogListingClient";

const pageTitle = "Import Export Blog — China to India Insights | ImportNow Hyderabad";
const pageDescription =
  "Practical guides on importing from China to India. Sourcing tips, customs processes, duty calculations, and supplier management from ImportNow.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const pageUrl = `${SITE_URL}/blog`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: pageUrl },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: pageUrl },
    ],
  });

  return (
    <>
      <LocalBusinessSchema />
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
      <BlogListingClient />
    </>
  );
}
