'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { isMobileNavbarOpenAtom } from '~/atoms/mobile-nav';
import useAuth from '~/hooks/useAuth';
import useMediaQuery from '~/hooks/useMediaQuery';
import { Button } from '~/components/ui/button';
import AddJobFloatingBtn from '~/components/dashboard/add-job-floating-btn';
import Header from '~/components/layout/dashboard/header';
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

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobileNavbarOpen = useAtomValue(isMobileNavbarOpenAtom);

  const { matches } = useMediaQuery('(min-width: 768px)');
  const { isLoggedIn } = useAuth();

  const pathname = usePathname();

  return (
    <div className="dashboard-grid-container min-h-dm relative">
      {!isLoggedIn ? (
        <main className="dashboard-main container py-6 md:py-12">
          <div className="grid h-full place-content-center">
            <div className="grid place-items-center gap-3 md:gap-6">
              <p className="font-medium text-foreground md:text-lg">
                Log in to view and manage your jobs.
              </p>
              <Button asChild size="lg" className="text-lg font-bold">
                <Link href="/login">Login</Link>
              </Button>
            </div>
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
      {isLoggedIn && pathname !== '/dashboard/add-job' && <AddJobFloatingBtn />}
    </div>
  );
}
