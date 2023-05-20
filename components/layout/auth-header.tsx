import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

import AnimatedThemeTabs from '../common/animated-theme-tabs';
import { buttonVariants } from '../ui/button';

export default function AuthHeader() {
  return (
    <header>
      <div className="container flex items-center justify-between gap-3 py-4 md:gap-5">
        <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
          <>
            <ChevronLeftIcon aria-hidden="true" className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <AnimatedThemeTabs />
      </div>
    </header>
  );
}
