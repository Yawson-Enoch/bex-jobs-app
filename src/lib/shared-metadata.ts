import { siteInfo } from '~/config/site';

export const openGraphName = { siteName: siteInfo.name };
export const openGraphImages = {
  images: [
    {
      url: '/og.png',
      width: 1200,
      height: 630,
    },
  ],
};
export const openGraphLocale = { locale: 'en_US' };
export const openGraphType = { type: 'website' };

export const twitterCard = { card: 'summary_large_image' };
export const twitterCreator = { creator: '@GyBex_Enoch' };
export const twitterImages = { images: ['/og.png'] };
