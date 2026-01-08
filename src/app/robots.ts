import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://importnow.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test-db/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}



