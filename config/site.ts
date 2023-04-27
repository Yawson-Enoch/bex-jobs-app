export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const siteConfig = {
  name: 'Bex Jobs',
  description: 'Site for job search management',
  url: APP_URL,
  ogImage: `${APP_URL}/og.png`,
  links: {
    twitter: 'https://twitter.com/GyBex_Enoch',
    github: 'https://github.com/Yawson-Enoch',
  },
};
