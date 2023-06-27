'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import LoadingIndicator from './loading-indicator';

const themes = [
  {
    theme: 'light',
    icon: <SunIcon className="h-5 w-5" />,
  },
  {
    theme: 'dark',
    icon: <MoonIcon className="h-5 w-5" />,
  },
  {
    theme: 'system',
    icon: <LaptopIcon className="h-5 w-5" />,
  },
];

export default function TabsThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [theme]);

  if (isLoading) {
    return <LoadingIndicator msg="Checking theme toggler state..." />;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border p-1">
      {themes.map((userTheme, index) => {
        return (
          <button
            onClick={() => {
              setTheme(userTheme.theme);
            }}
            className="relative rounded-full p-1 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring"
            key={index}
          >
            {theme === userTheme.theme && (
              <motion.div
                aria-hidden="true"
                layout="position"
                layoutId="active-theme"
                className="absolute inset-0 bg-accent"
                style={{ borderRadius: 9999 }}
                transition={{
                  type: 'spring',
                  duration: 0.5,
                }}
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
