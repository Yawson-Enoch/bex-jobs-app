'use client';

import { atom, useAtom } from 'jotai';
import { LoaderIcon, MenuIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

import AnimatedThemeTabs from '../common/animated-theme-tabs';
import UserProfile from '../common/user-profile';

export const isMobileNavbarOpenAtom = atom(false);

export default function DashboardHeader() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useAtom(
    isMobileNavbarOpenAtom
  );

  const { isCheckingAuth, userAuthInfo } = useAuth();

  return (
    <header className="dashboard-header sticky top-0 flex h-16 items-center border-b bg-background/70 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-1">
        <button
          aria-expanded={isMobileNavbarOpen}
          aria-controls="mobile-navbar"
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMobileNavbarOpen(true)}
        >
          <span className="sr-only">Open Mobile Nav</span>
          <MenuIcon aria-hidden="true" />
        </button>
        <div className="hidden md:block">
          {isCheckingAuth ? (
            <div role="status">
              <span className="sr-only">Getting user info...</span>
              <LoaderIcon
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            <p className="text-3xl font-bold">Hi, {userAuthInfo?.username}</p>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <AnimatedThemeTabs />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
