import type { Metadata } from 'next';

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

import IndexPageClient from './page.client';

const title = siteInfo.name;
const description = siteInfo.description;
const url = '/';

export const metadata: Metadata = {
  openGraph: {
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
    title,
    description,
    url,
  },
  twitter: {
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
    title,
    description,
  },
  alternates: {
    canonical: url,
  },
};

export default function IndexPage() {
  return <IndexPageClient />;
}
