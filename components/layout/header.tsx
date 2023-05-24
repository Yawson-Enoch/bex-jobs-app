import Link from 'next/link';

import GradientLogo from '../common/gradient-logo';
import { ThemeToggle } from '../common/theme-toggle';
import { buttonVariants } from '../ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 md:px-[0.5rem]">
      <div className="container flex items-center justify-between gap-3 border-b bg-background/70 py-4 backdrop-blur-sm md:gap-5 md:rounded-b-full md:rounded-t-none md:border-x md:px-10">
        <Link
          href="/"
          className="rounded-md p-[1px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <GradientLogo />
        </Link>
        <div className="flex items-center gap-3 md:gap-10">
          <ThemeToggle />
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/login"
              className={buttonVariants({ size: 'sm', variant: 'outline' })}
            >
              Log In
            </Link>
            <Link href="/signup" className={buttonVariants({ size: 'sm' })}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
