import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';
import DropdownThemeToggler from '~/components/common/dropdown-theme-toggler';
import GradientLogo from '~/components/common/gradient-logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-16 md:px-[0.5rem]">
      <div className="container flex h-full items-center justify-between gap-3 border-b bg-background/70 backdrop-blur-sm md:gap-6 md:rounded-b-full md:rounded-t-none md:border-x md:px-10">
        <Link href="/">
          <GradientLogo />
        </Link>
        <div className="flex items-center gap-3 md:gap-10">
          <DropdownThemeToggler />
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
