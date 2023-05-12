'use client';

import Link from 'next/link';

import useAuth from '@/hooks/useAuth';

import { Button } from './ui/button';

export default function DashboardHeader() {
  const { isLoggedIn, userInfo, logOut } = useAuth();

  return (
    <header>
      {isLoggedIn ? (
        <>
          {JSON.stringify(userInfo, null, 2)}
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
