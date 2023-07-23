'use client';

import { redirect, usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { isMobileNavbarOpenAtom } from '~/atoms/mobile-nav';
import useAuth from '~/hooks/useAuth';
import useIsMounted from '~/hooks/useIsMounted';
import useMediaQuery from '~/hooks/useMediaQuery';
import Preloader from '~/components/common/preloader';
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
  const { isMounted } = useIsMounted();

  const pathname = usePathname();

  if (!isMounted) {
    return <Preloader />;
  }

  if (!isLoggedIn) {
    redirect('/login');
  }

  return (
    <div className="dashboard-grid-container min-h-dm relative">
      <Header />
      <Sidebar />
      <main className="dashboard-main container py-6 md:py-12">{children}</main>
      <DecorativePattern />
      {isMobileNavbarOpen && !matches && <MobileNavbar />}
      {isLoggedIn && pathname !== '/dashboard/add-job' && <AddJobFloatingBtn />}
    </div>
  );
}
