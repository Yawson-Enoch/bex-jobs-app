import { Metadata } from 'next';
import Link from 'next/link';

import { siteInfo } from '~/config/site';
import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '~/lib/shared-metadata';
import { Button } from '~/components/ui/button';

const title = 'Page Not Found';
const description = 'Oops! The page you are looking for cannot be found';

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.URL),
  title,
  description,
  openGraph: {
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
    title,
    description,
  },
  twitter: {
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
    title,
    description,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-dm relative grid place-content-center">
      <main className="container space-y-3 text-center">
        <h2>Oops! Page not found</h2>
        <div className="gradient-text-stroke tracking-wide md:duration-700 md:ease-linear md:animate-in md:slide-in-from-top-7">
          404
        </div>
        <div className="space-y-3 md:space-y-6">
          <p className="max-w-md">
            The page you&#39;re looking for seems to have gone on vacation.
            Please double-check the URL or navigate back to our homepage to
            continue exploring.
          </p>
          <Button asChild size="lg" className="rounded-full text-lg font-bold">
            <Link href="/">GO HOME</Link>
          </Button>
        </div>
      </main>
      <DecorativePattern />
    </div>
  );
}

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-zigzag-3d fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-20 pattern-size-8 dark:pattern-gray-800"
    ></div>
  );
}
