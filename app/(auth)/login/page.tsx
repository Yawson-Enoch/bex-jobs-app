import type { Metadata } from 'next';
import Link from 'next/link';

import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <section className="container py-5">
      <div className="mx-auto w-[min(100%,400px)] space-y-7 rounded-lg border border-border bg-background p-5 dark:bg-background/10 dark:backdrop-blur-sm">
        <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          Login
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
  title: 'Login',
  description: 'Login to your account',
};
