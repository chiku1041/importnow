/**
 * LocalBusiness Schema Component
 * Adds LocalBusiness structured data (JSON-LD) for SEO
 */

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ImportNow",
    "description": "Import export consultant in Hyderabad specializing in China to India imports. Product sourcing, quality inspection, customs clearance, and logistics.",
    "url": "https://importnow.in",
    "telephone": "+919989724320",
    "email": "hello@Importnow.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "areaServed": ["India", "Hyderabad", "Delhi", "Mumbai", "Bangalore"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "17.3850",
        "longitude": "78.4867"
      }
    },
    "sameAs": [],
    "priceRange": "$$",
    "image": "https://importnow.in/logo.png",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Import Consulting Services",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Product Sourcing from China"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Quality Inspection"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Customs Clearance"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Supply Chain & Logistics"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brand Building & Private Labeling"}}
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
