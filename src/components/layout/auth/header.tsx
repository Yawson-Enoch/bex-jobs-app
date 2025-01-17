import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import TabsThemeToggler from '~/components/common/tabs-theme-toggler';

export default function Header() {
  return (
    <header className="h-16">
      <div className="container flex h-full items-center justify-between gap-3 md:gap-6">
        <Button
          asChild
          variant="ghost"
          className="flex items-center gap-1 font-medium"
        >
          <Link href="/">
            <ChevronLeftIcon aria-hidden="true" size={17} />
            <span>Home</span>
          </Link>
        </Button>
        <TabsThemeToggler />
      </div>
    </header>
  );
}
