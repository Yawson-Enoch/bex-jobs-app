import { siteInfo } from '~/config/site';

export const openGraphName = { siteName: siteInfo.name };
export const openGraphImages = {
  images: [
    {
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
    },
  ],
};
export const openGraphLocale = { locale: 'en_US' };
export const openGraphType = { type: 'website' };

export const twitterCard = { card: 'summary_large_image' };
export const twitterCreator = { creator: '@gybex_enock' };
export const twitterImages = { images: ['/opengraph-image.png'] };
