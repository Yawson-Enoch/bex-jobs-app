'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import useAuth from '~/hooks/useAuth';
import useCustomRouter from '~/hooks/useCustomRouter';
import LoginForm from '~/components/auth/login-form';
import AnimatedCharacters from '~/components/common/animated-characters';
import AuthLoadingIndicator from '~/components/common/auth-loading-indicator';
import LoadingIndicator from '~/components/common/loading-indicator';

export default function LoginPageClient() {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  const router = useCustomRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router]);

  if (isCheckingAuth) {
    return <AuthLoadingIndicator />;
  }

  if (isLoggedIn) {
    return (
      <div className="mx-auto grid w-[min(100%,_400px)] place-content-center space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
        <h4>Hooray! You are logged in</h4>
        <LoadingIndicator type="both" msg="Redirecting to dashboard..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-[min(100%,_400px)] space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
      <h3 className="text-center">
        <AnimatedCharacters text="Login" />
      </h3>
      <LoginForm />
      <p className="text-center text-sm">
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
