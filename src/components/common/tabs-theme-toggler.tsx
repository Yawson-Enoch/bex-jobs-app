'use client';

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

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

  return (
    <div className="flex h-9 items-center gap-1 overflow-hidden rounded-full border p-1">
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
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent"
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
