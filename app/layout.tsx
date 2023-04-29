import '@/styles/globals.css';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import DecorativeBlobs from '@/components/decorative-blobs';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Providers from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Jobs', 'Management', 'Bex Jobs', 'Jobs Management'],
  authors: [
    {
      name: 'GyBex',
      url: siteConfig.url,
    },
  ],
  creator: 'GyBex',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@GyBex_Enoch',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
          <div className="relative flex min-h-screen flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>
          <DecorativeBlobs />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
