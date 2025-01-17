import { MetadataRoute } from 'next';

import { siteConfig } from '~/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    host: siteConfig.URL,
    sitemap: `${siteConfig.URL}/sitemap.xml`,
  };
}
