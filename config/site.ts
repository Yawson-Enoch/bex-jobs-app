export const APP_URL =
  process.env.VERCEL_URL === undefined
    ? `http://localhost:${process.env.PORT || 3000}`
    : `https://${process.env.VERCEL_URL}`;

export const siteInfo = {
  name: 'BexJobs',
  description: `Job search management tool designed to help you keep 
  track of all your job applications in one place`,
  url: APP_URL,
  links: {
    twitter: 'https://twitter.com/GyBex_Enoch',
    github: 'https://github.com/Yawson-Enoch',
    portfolio: 'https://yawson-enoch.netlify.app',
  },
};
