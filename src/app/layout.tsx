import '~/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '~/config/site';
import { fontSans } from '~/lib/fonts';
import { Toaster } from '~/components/ui/toaster';
import Providers from '~/components/common/providers';
import TailwindIndicator from '~/components/common/tailwind-indicator';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.URL),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@gybex_enock',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#030711' },
  ],
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
        <div className="min-h-dvh before:fixed before:-bottom-16 before:-left-16 before:size-56 before:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] before:bg-gradient-to-b before:from-primary/20 before:from-40% before:to-secondary/10 before:to-95% before:bg-fixed before:blur-3xl before:content-[''] after:fixed after:-right-16 after:-top-16 after:size-56 after:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] after:bg-gradient-to-b after:from-primary/20 after:from-40% after:to-secondary/10 after:to-95% after:bg-fixed after:blur-3xl after:content-[''] before:md:size-96 after:md:size-96">
          <Providers>
            {children}
            <Toaster />
            <TailwindIndicator />
          </Providers>
        </div>
      </body>
    </html>
  );
}
