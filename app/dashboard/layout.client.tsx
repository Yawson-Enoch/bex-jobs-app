'use client';

import Link from 'next/link';
import { LoaderIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import DashboardHeader from '@/components/layout/dashboard-header';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-boxes fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
      style={{
        maskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
        WebkitMaskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
      }}
    ></div>
  );
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="dashboard-grid-container min-h-screen">
        <main className="dashboard-main container py-6 md:py-12">
          <div role="status" className="flex items-center gap-2">
            <LoaderIcon
              aria-hidden="true"
              className="mr-2 h-5 w-5 animate-spin"
            />
            <span>Checking auth...</span>
          </div>
        </main>
        <DecorativePattern />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="dashboard-grid-container min-h-screen">
        <main className="dashboard-main container py-6 md:py-12">
          <p>
            Please{' '}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4"
            >
              login
            </Link>{' '}
            to view and manage your jobs.
          </p>
        </main>
        <DecorativePattern />
      </div>
    );
  }

  return (
    <div className="dashboard-grid-container min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main container py-6 md:py-12">{children}</main>
      <DecorativePattern />
    </div>
  );
}
