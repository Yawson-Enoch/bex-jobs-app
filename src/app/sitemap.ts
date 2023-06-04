import { MetadataRoute } from 'next';

import { siteInfo } from '~/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteInfo.url}`,
      lastModified: new Date(),
    },
    {
      url: `${siteInfo.url}/login`,
      lastModified: new Date(),
    },
    {
      url: `${siteInfo.url}/signup`,
      lastModified: new Date(),
    },
  ];
}
