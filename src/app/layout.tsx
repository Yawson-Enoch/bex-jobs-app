import '~/styles/globals.css';

import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteInfo } from '~/config/site';
import { fontSans } from '~/lib/fonts';
import { Toaster } from '~/components/ui/toaster';
import DecorativeBlobs from '~/components/common/decorative-blobs';
import Providers from '~/components/common/providers';
import TailwindIndicator from '~/components/common/tailwind-indicator';

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.URL),
  title: {
    default: siteInfo.name,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    'GyBex',
    'Jobs',
    'Management',
    'BexJobs',
    'Jobs Management',
    'Job Search',
  ],
  authors: [
    {
      name: 'GyBex',
      url: siteInfo.links.portfolio,
    },
  ],
  creator: 'GyBex',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#030711' },
  ],
  manifest: '/manifest.json',
};

export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={twMerge('font-sans antialiased', fontSans.variable)}>
        <Providers>
          {children}
          <DecorativeBlobs />
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
