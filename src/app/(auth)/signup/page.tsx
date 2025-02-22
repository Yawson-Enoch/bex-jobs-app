import type { Metadata } from 'next';
import Link from 'next/link';

import SignupForm from '~/components/auth/signup-form';
import AnimatedCharacters from '~/components/common/animated-characters';

const title = 'Create An Account';
const description = 'Create an account to start managing your job applications';

export const metadata: Metadata = {
  title,
  description,
};

export default function SignupPage() {
  return (
    <div className="mx-auto w-[min(100%,_400px)] space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
      <h3 className="text-center">
        <AnimatedCharacters text="Signup" />
      </h3>
      <SignupForm />
      <p className="text-center text-sm">
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Already a member? Log In
        </Link>
      </p>
    </div>
  );
}
