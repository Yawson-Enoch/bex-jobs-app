'use client';

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function DropdownThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <SunIcon
            aria-hidden="true"
            className="size-5 rotate-0 scale-100 transition-all sm:size-6 dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            aria-hidden="true"
            className="absolute size-5 rotate-90 scale-0 transition-all sm:size-6 dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-background dark:bg-background/90 dark:backdrop-blur-sm"
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon aria-hidden="true" className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon aria-hidden="true" className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <LaptopIcon aria-hidden="true" className="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
