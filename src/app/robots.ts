import { MetadataRoute } from 'next';

import { siteInfo } from '~/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    host: siteInfo.url,
    sitemap: `${siteInfo.url}/sitemap.xml`,
  };
}
