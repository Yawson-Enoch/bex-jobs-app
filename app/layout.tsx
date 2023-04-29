import '@/styles/globals.css';
import * as React from 'react';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">{children}</div>
          <TailwindIndicator />
        </ThemeProvider>
        <div className="fixed inset-0 -z-10 overflow-hidden before:absolute before:bottom-5 before:left-5 before:h-56 before:w-56 before:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] before:bg-gradient-to-b before:from-blue-500/20 before:from-40% before:to-yellow-500/10 before:to-95% before:blur-3xl before:content-[''] after:absolute after:right-5 after:top-5 after:h-56 after:w-56 after:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] after:bg-gradient-to-b after:from-blue-500/20 after:from-40% after:to-yellow-500/10 after:to-95% after:blur-3xl after:content-[''] before:lg:h-96 before:lg:w-96 after:lg:h-96 after:lg:w-96"></div>
      </body>
    </html>
  );
}
