import type { Metadata } from 'next';
import Link from 'next/link';

import AnimateCharacters from '@/components/animate-characters';
import SignupForm from '@/components/signup-form';

export default function SignupPage() {
  return (
    <section className="container py-3">
      <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background p-3 dark:bg-background/10 dark:backdrop-blur-sm md:space-y-5 md:p-5">
        <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          <AnimateCharacters text="Signup" />
        </h3>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Already a member? Log In
          </Link>
        </p>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Create An Account',
  description: 'Create an account to start managing your job applications',
};
