import { MetadataRoute } from 'next';

import { siteInfo } from '~/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/login', '/signup'].map((route) => ({
    url: siteInfo.url + route,
    lastModified: new Date(),
  }));

  return [...routes];
}
