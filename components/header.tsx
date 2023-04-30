import Link from 'next/link';

import LoginBtn from './LoginBtn';
import SignUpBtn from './SignUpBtn';
import GradientLogo from './gradient-logo';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="px-2 pt-2">
      <div className="container flex items-center justify-between gap-3 rounded-full border bg-background/10 px-4 py-2 backdrop-blur-sm md:gap-5">
        <Link href="/">
          <GradientLogo />
        </Link>
        <div className="flex items-center gap-1 md:gap-10">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <LoginBtn>Login</LoginBtn>
            <SignUpBtn>Sign Up</SignUpBtn>
          </div>
        </div>
      </div>
    </header>
  );
}
