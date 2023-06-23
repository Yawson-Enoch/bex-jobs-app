import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

import { buttonVariants } from '~/components/ui/button';
import TabsThemeToggler from '~/components/common/tabs-theme-toggler';

export default function Header() {
  return (
    <header className="h-16">
      <div className="container flex h-full items-center justify-between gap-3 md:gap-6">
        <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
          <ChevronLeftIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>Back</span>
        </Link>
        <TabsThemeToggler />
      </div>
    </header>
  );
}
