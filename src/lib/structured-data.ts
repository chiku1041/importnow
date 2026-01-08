/**
 * Structured Data (JSON-LD) utilities for SEO
 * Helps search engines understand site structure and show sitelinks
 */

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface WebPageSchema {
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && {
      logo: {
        "@type": "ImageObject",
        url: data.logo,
      },
    }),
    ...(data.description && { description: data.description }),
    ...(data.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType || "Customer Service",
        email: data.contactPoint.email,
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema(data: WebPageSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.breadcrumb && {
      breadcrumb: generateBreadcrumbSchema(data.breadcrumb),
    }),
  };
}

/**
 * Generate Website structured data with SiteLinksSearchBox
 */
export function generateWebsiteSchema(baseUrl: string, searchUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ImportNow",
    url: baseUrl,
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: searchUrl,
        },
        "query-input": "required name=search_term_string",
      },
    }),
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  provider: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: provider,
    },
  };
}

