import type { Metadata } from 'next';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '~/lib/shared-metadata';
import ProfileUpdateForm from '~/components/dashboard/profile-update-form';

const title = 'Profile';
const description = 'View and easily update your profile details';
const url = '/dashboard/profile';

export const metadata: Metadata = {
  title,
  description,
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

export default function ProfilePage() {
  return (
    <div className="grid h-full content-center">
      <div className="space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
        <h3>Profile</h3>
        <ProfileUpdateForm />
      </div>
    </div>
  );
}
