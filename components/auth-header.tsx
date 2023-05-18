import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { buttonVariants } from './ui/button';

export default function AuthHeader() {
  return (
    <header>
      <div className="container flex items-center justify-between gap-3 py-4 md:gap-5">
        <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
          <>
            <ChevronLeft aria-hidden="true" className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </div>
    </header>
  );
}
