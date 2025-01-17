'use client';

import { motion } from 'framer-motion';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import useIsMounted from '~/hooks/useIsMounted';

const themes = [
  {
    theme: 'light',
    icon: <SunIcon className="size-5" />,
  },
  {
    theme: 'dark',
    icon: <MoonIcon className="size-5" />,
  },
  {
    theme: 'system',
    icon: <LaptopIcon className="size-5" />,
  },
];

export default function TabsThemeToggler() {
  const { theme, setTheme } = useTheme();
  const { isMounted } = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="flex h-9 items-center gap-1 rounded-full border bg-background p-1">
      {themes.map((userTheme) => {
        return (
          <button
            key={userTheme.theme}
            onClick={() => {
              setTheme(userTheme.theme);
            }}
            className="relative rounded-full p-1 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            {theme === userTheme.theme && (
              <motion.div
                aria-hidden="true"
                layout="position"
                layoutId="active-theme"
                layoutDependency={userTheme.theme}
                className="absolute inset-0 bg-accent"
                style={{ borderRadius: 9999 }}
              />
            )}
            <span aria-hidden="true" className="relative z-10">
              {userTheme.icon}
            </span>
            <span className="sr-only">{userTheme.theme}</span>
          </button>
        );
      })}
    </div>
  );
}
