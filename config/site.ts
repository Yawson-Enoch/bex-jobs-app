export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const siteConfig = {
  name: 'BexJobs',
  description: `Job search management tool designed to help you keep 
  track of all your job applications in one place`,
  url: APP_URL,
  ogImage: `${APP_URL}/og.png`,
  links: {
    twitter: 'https://twitter.com/GyBex_Enoch',
    github: 'https://github.com/Yawson-Enoch',
  },
};
