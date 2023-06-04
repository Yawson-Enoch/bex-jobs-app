'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import useAuth from '~/hooks/useAuth';
import { buttonVariants } from '~/components/ui/button';
import LoginForm from '~/components/auth/login-form';
import AnimatedCharacters from '~/components/common/animated-characters';
import AuthLoader from '~/components/common/auth-loader';

export default function LoginPageClient() {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <AuthLoader />;
  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-3 md:gap-5">
        <p className="font-medium md:text-lg">
          Hooray! You are already logged in
        </p>
        <Link
          href="/dashboard"
          className={twMerge(
            buttonVariants({ size: 'lg' }),
            'mx-auto font-medium md:text-lg'
          )}
        >
          Start Managing Your Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background/70 p-3 md:space-y-6 md:p-6">
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
