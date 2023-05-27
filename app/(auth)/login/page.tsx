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
import LoginForm from '@/components/auth/login-form';
import AnimatedCharacters from '@/components/common/animated-characters';

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
    <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background p-3 md:space-y-6 md:p-6">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        <AnimatedCharacters text="Login" />
      </h3>
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
  );
}
