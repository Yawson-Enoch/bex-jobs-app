import Link from 'next/link';

import { Button } from '~/components/ui/button';
import AuthActions from '~/components/common/auth-actions';
import DropdownThemeToggler from '~/components/common/dropdown-theme-toggler';
import GradientLogo from '~/components/common/gradient-logo';

export default function Header() {
  return (
    <header className="container sticky top-4 z-10 h-16 lg:top-0">
      <div className="flex h-full items-center justify-between gap-3 rounded-full border bg-background/70 px-3 backdrop-blur-sm sm:px-6 lg:gap-6 lg:rounded-none lg:rounded-b-full lg:border-0 lg:border-x lg:border-b lg:px-12">
        <Link href="/">
          <GradientLogo />
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <DropdownThemeToggler />
          <div className="hidden items-center gap-3 sm:flex">
            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          <div className="sm:hidden">
            <AuthActions />
          </div>
        </div>
      </div>
    </header>
  );
}
