'use client';

import '~/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '~/config/site';
import { fontSans } from '~/lib/fonts';
import { Button } from '~/components/ui/button';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Oops! An Error Has Occured</title>
      </head>
      <body className={twMerge('font-sans antialiased', fontSans.variable)}>
        <div className="min-h-dvh before:fixed before:-bottom-16 before:-left-16 before:size-56 before:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] before:bg-gradient-to-b before:from-primary/20 before:from-40% before:to-secondary/10 before:to-95% before:bg-fixed before:blur-3xl before:content-[''] after:fixed after:-right-16 after:-top-16 after:size-56 after:rounded-[30%_70%_79%_21%_/_30%_44%_56%_70%] after:bg-gradient-to-b after:from-primary/20 after:from-40% after:to-secondary/10 after:to-95% after:bg-fixed after:blur-3xl after:content-[''] before:md:size-96 after:md:size-96">
          <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
            <div className="container grid min-h-dvh place-content-center gap-3 text-center md:gap-6">
              <h2>Something went wrong!</h2>
              <p className="max-w-md">
                Please try again later or refresh the page. If the problem
                persists, kindly reach out to{' '}
                <a
                  href={siteConfig.links.twitter}
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
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
