'use client';

import { Loader } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

import UserProfile from './user-profile';

export default function DashboardHeader() {
  const { isCheckingAuth, userAuthInfo } = useAuth();

  return (
    <header className="border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        <p className="text-3xl font-bold">Hi, {userAuthInfo?.username}</p>
        {isCheckingAuth ? (
          <div role="status">
            <span className="sr-only">Logging in...</span>
            <Loader aria-hidden="true" className="mr-2 h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-5">
            <UserProfile />
          </div>
        )}
      </div>
    </header>
  );
}
