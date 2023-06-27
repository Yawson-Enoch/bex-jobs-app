'use client';

import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';

import useAuth from '~/hooks/useAuth';
import useMediaQuery from '~/hooks/useMediaQuery';
import { buttonVariants } from '~/components/ui/button';
import AuthLoadingIndicator from '~/components/common/auth-loading-indicator';
import Header, {
  isMobileNavbarOpenAtom,
} from '~/components/layout/dashboard/header';
import MobileNavbar from '~/components/layout/dashboard/mobile-navbar';
import Sidebar from '~/components/layout/dashboard/sidebar';

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

function GoToLogin() {
  return (
    <div className="grid place-items-center gap-3 md:gap-6">
      <p className="font-medium text-foreground md:text-lg">
        Log in to view and manage your jobs.
      </p>
      <Link
        href="/login"
        className={twMerge(
          buttonVariants({ size: 'lg' }),
          'font-medium md:text-lg'
        )}
      >
        Login
      </Link>
    </div>
  );
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobileNavbarOpen = useAtomValue(isMobileNavbarOpenAtom);

  const { matches } = useMediaQuery('(min-width: 768px)');
  const { isLoggedIn, isCheckingAuth } = useAuth();

  return (
    <div className="dashboard-grid-container min-h-dm relative">
      {isCheckingAuth ? (
        <main className="dashboard-main container py-6 md:py-12">
          <div className="grid h-full place-content-center">
            <AuthLoadingIndicator />
          </div>
        </main>
      ) : !isLoggedIn ? (
        <main className="dashboard-main container py-6 md:py-12">
          <div className="grid h-full place-content-center">
            <GoToLogin />
          </div>
        </main>
      ) : (
        <>
          <Header />
          <Sidebar />
          {isMobileNavbarOpen && !matches && <MobileNavbar />}
          <main className="dashboard-main container py-6 md:py-12">
            {children}
          </main>
        </>
      )}
      <DecorativePattern />
    </div>
  );
}
