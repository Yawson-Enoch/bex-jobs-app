import type { Metadata } from 'next';

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
import Header from '@/components/header';
import LandingPage from '@/components/landing-page';

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

export default function IndexPage() {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  );
}
