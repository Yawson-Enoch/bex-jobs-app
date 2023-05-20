'use client';

import { LoaderIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

import AnimatedThemeTabs from '../common/animated-theme-tabs';
import UserProfile from '../common/user-profile';

export default function DashboardHeader() {
  const { isCheckingAuth, userAuthInfo } = useAuth();

  return (
    <header className="flex h-16 items-center border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-1">
        {isCheckingAuth ? (
          <div role="status">
            <span className="sr-only">Logging in...</span>
            <LoaderIcon
              aria-hidden="true"
              className="mr-2 h-5 w-5 animate-spin"
            />
          </div>
        ) : (
          <p className="text-3xl font-bold">Hi, {userAuthInfo?.username}</p>
        )}
        <div className="flex items-center gap-3 md:gap-5">
          <AnimatedThemeTabs />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
