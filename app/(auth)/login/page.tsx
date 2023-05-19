import type { Metadata } from 'next';
import Link from 'next/link';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '@/lib/shared-metadata';
import AnimateCharacters from '@/components/animate-characters';
import LoginForm from '@/components/login-form';

const title = 'Log In To Your Account';
const description = 'Log in to your account and access your dashboard';
const url = '/login';

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

export default function LoginPage() {
  return (
    <main className="container py-4">
      <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background p-3 md:space-y-5 md:p-5">
        <p className="text-center text-2xl font-semibold">
          <AnimateCharacters text="Login" />
        </p>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
