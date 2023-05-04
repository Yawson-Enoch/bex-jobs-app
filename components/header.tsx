import Link from 'next/link';

import GradientLogo from './gradient-logo';
import LoginBtn from './login-btn';
import SignupBtn from './signup-btn';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="px-2 pt-3 lg:pt-0">
      <div className="container flex items-center justify-between gap-3 rounded-full border bg-background px-4 py-2 dark:bg-background/10 dark:backdrop-blur-sm md:gap-5 lg:rounded-b-full lg:rounded-t-none lg:border-t-0 lg:px-12">
        <Link href="/">
          <GradientLogo />
        </Link>
        <div className="flex items-center gap-1 md:gap-10">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <LoginBtn>Log In</LoginBtn>
            <SignupBtn>Sign Up</SignupBtn>
          </div>
        </div>
      </div>
    </header>
  );
}
