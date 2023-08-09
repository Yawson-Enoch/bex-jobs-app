const deployedSiteURL = process.env.NEXT_PUBLIC_VERCEL_URL;

export const siteInfo = {
  name: 'BexJobs',
  description: `Job search management tool designed to help you keep 
  track of all your job applications in one place`,
  URL: deployedSiteURL
    ? `https://${deployedSiteURL}`
    : `http://localhost:${process.env.PORT || 3000}`,
  APIBaseURL: deployedSiteURL
    ? 'https://bex-jobs-api.onrender.com/api/v1'
    : 'http://localhost:5000/api/v1',
  links: {
    twitter: 'https://twitter.com/gybex_enock',
    github: 'https://github.com/Yawson-Enoch',
    linkedin: 'https://www.linkedin.com/in/enock-yawson-696b71222',
    codepen: 'https://codepen.io/gybex_enock',
    portfolio: 'https://gybex.dev',
  },
};
