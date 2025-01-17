import { MetadataRoute } from 'next';

import { siteConfig } from '~/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/login', '/signup'].map((route) => ({
    url: siteConfig.URL + route,
    lastModified: new Date(),
  }));

  return [...routes];
}
