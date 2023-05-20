'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LaptopIcon, LoaderIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { twMerge } from 'tailwind-merge';

const themes = [
  {
    theme: 'light',
    icon: <SunIcon aria-hidden="true" className="h-5 w-5" />,
  },
  {
    theme: 'system',
    icon: <LaptopIcon aria-hidden="true" className="h-5 w-5" />,
  },
  {
    theme: 'dark',
    icon: <MoonIcon aria-hidden="true" className="h-5 w-5" />,
  },
];

export default function AnimatedThemeTabs() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [theme]);

  if (isLoading) {
    return (
      <div role="status">
        <span className="sr-only">Checking theme toggler state...</span>
        <LoaderIcon aria-hidden="true" className="mr-2 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-fit w-fit items-center rounded-full border p-1">
      {themes.map((userTheme, index) => {
        return (
          <button
            onClick={() => {
              setTheme(userTheme.theme);
            }}
            className={twMerge('relative rounded-full p-1')}
            key={index}
          >
            {theme === userTheme.theme && (
              <motion.div
                layoutId="active-theme"
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <span className="relative z-10">{userTheme.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
