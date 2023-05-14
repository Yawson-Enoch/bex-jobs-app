import '@/styles/globals.css';
import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteInfo } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';
import DecorativeBlobs from '@/components/decorative-blobs';
import FadedStrips from '@/components/faded-strips';
import Footer from '@/components/footer';
import Providers from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
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
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteInfo.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={twMerge(
          'min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col justify-between gap-3 md:gap-5">
            {children}
            <Footer />
          </div>
          <DecorativeBlobs />
          <FadedStrips />
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
