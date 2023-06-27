'use client';

import '~/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { twMerge } from 'tailwind-merge';

import { siteInfo } from '~/config/site';
import { fontSans } from '~/lib/fonts';
import { Button } from '~/components/ui/button';
import DecorativeBlobs from '~/components/common/decorative-blobs';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-moon fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-6 dark:pattern-gray-800"
    ></div>
  );
}

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={twMerge('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
          <div className="min-h-dm container grid place-content-center gap-3 text-center md:gap-6">
            <h2>Something went wrong!</h2>
            <p className="max-w-md">
              Please try again later or refresh the page. If the problem
              persists, kindly reach out to{' '}
              <a
                href={siteInfo.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GyBex
              </a>{' '}
              for assistance.
            </p>
            <Button
              className="justify-self-center rounded-full text-lg font-medium"
              onClick={() => reset()}
            >
              Refresh page
            </Button>
          </div>
          <DecorativeBlobs />
          <DecorativePattern />
        </ThemeProvider>
      </body>
    </html>
  );
}
