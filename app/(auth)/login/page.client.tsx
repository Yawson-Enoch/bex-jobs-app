'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useAuth from '@/hooks/useAuth';
import LoginForm from '@/components/auth/login-form';
import AnimatedCharacters from '@/components/common/animated-characters';

export default function LoginPageClient() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router]);

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
