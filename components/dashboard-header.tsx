'use client';

import Link from 'next/link';
import { Loader } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

import { Button } from './ui/button';

export default function DashboardHeader() {
  const { isCheckingAuth, isLoggedIn, userAuthInfo, logOut } = useAuth();

  return (
    <header>
      {isCheckingAuth ? (
        <div role="status">
          <span className="sr-only">Logging in...</span>
          <Loader aria-hidden="true" className="mr-2 h-5 w-5 animate-spin" />
        </div>
      ) : isLoggedIn ? (
        <>
          {JSON.stringify(userAuthInfo, null, 2)}
          <Button variant="ghost" className="ml-5" onClick={() => logOut()}>
            Log out
          </Button>
        </>
      ) : (
        <p>
          Please{' '}
          <Link
            href="/login"
            className="font-medium underline underline-offset-4"
          >
            login
          </Link>{' '}
          to access this route
        </p>
      )}
    </header>
  );
}
