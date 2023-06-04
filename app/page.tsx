import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteInfo } from '@/config/site';
import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '@/lib/shared-metadata';
import LandingPageContent from '@/components/common/landing-page-content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const title = siteInfo.name;
const description = siteInfo.description;
const url = '/';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
  },
  twitter: {
    title,
    description,
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
  },
  alternates: {
    canonical: url,
  },
};

const patterns = [
  'pattern-zigzag',
  'pattern-rectangles',
  'pattern-rhombus',
  'pattern-isometric',
];
const randomIndex = Math.floor(Math.random() * patterns.length);
const randomPattern = patterns[randomIndex];

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        'fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800',
        randomPattern
      )}
    ></div>
  );
}

export default function IndexPage() {
  return (
    <>
      <Header />
      <main className="container py-6 md:py-12">
        <LandingPageContent />
      </main>
      <Footer />
      <DecorativePattern />
    </>
  );
}
