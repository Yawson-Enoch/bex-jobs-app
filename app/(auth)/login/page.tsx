import type { Metadata } from 'next';
import Link from 'next/link';

import AnimateCharacters from '@/components/animate-characters';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <section className="container py-3">
      <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background p-3 dark:bg-background/10 dark:backdrop-blur-sm md:space-y-5 md:p-5">
        <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          <AnimateCharacters text="Login" />
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
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Log In To Your Account',
  description: 'Log in to your account and access your dashboard',
};
