'use client';

import Link from 'next/link';

import LoginForm from '~/components/auth/login-form';
import AnimatedCharacters from '~/components/common/animated-characters';

export default function LoginPageClient() {
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
