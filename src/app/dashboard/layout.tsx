'use client';

import { redirect, usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { LoaderIcon } from 'lucide-react';

import { isMobileNavbarOpenAtom } from '~/atoms/mobile-nav';
import useAuth from '~/hooks/useAuth';
import useIsMounted from '~/hooks/useIsMounted';
import useMediaQuery from '~/hooks/useMediaQuery';
import AddJobFloatingBtn from '~/components/dashboard/add-job-floating-btn';
import Header from '~/components/layout/dashboard/header';
import MobileNavbar from '~/components/layout/dashboard/mobile-navbar';
import Sidebar from '~/components/layout/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobileNavbarOpen = useAtomValue(isMobileNavbarOpenAtom);

  const { matches } = useMediaQuery('(min-width: 768px)');
  const { isLoggedIn } = useAuth();

  const pathname = usePathname();

  const { isMounted } = useIsMounted();

  if (isMounted && !isLoggedIn) {
    redirect('/login');
  }

  let content;

  if (!isMounted) {
    content = (
      <main className="container grid min-h-dvh place-content-center place-items-center py-6 md:py-12">
        <LoaderIcon className="animate-spin" />
      </main>
    );
  } else {
    content = (
      <div className="dashboard-grid-container relative min-h-dvh">
        <Header />
        <Sidebar />
        <main className="dashboard-main container py-6 md:py-12">
          {children}
        </main>
        {isMobileNavbarOpen && !matches && <MobileNavbar />}
        {isLoggedIn && pathname !== '/dashboard/add-job' && (
          <AddJobFloatingBtn />
        )}
      </div>
    );
  }

  return content;
}
