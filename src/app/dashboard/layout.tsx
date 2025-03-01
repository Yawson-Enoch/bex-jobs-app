'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { InfoIcon, LoaderIcon } from 'lucide-react';

import { isMobileNavbarOpenAtom } from '~/atoms/mobile-nav';
import useAuth from '~/hooks/useAuth';
import useIsMounted from '~/hooks/useIsMounted';
import useMediaQuery from '~/hooks/useMediaQuery';
import { Button } from '~/components/ui/button';
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
  const router = useRouter();

  const { isMounted } = useIsMounted();

  let content;

  if (!isMounted) {
    content = (
      <main className="container grid min-h-dvh place-content-center place-items-center py-6 md:py-12">
        <LoaderIcon className="animate-spin" />
      </main>
    );
  } else {
    content = isLoggedIn ? (
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
    ) : (
      <div className="grid min-h-dvh place-content-center text-center">
        <InfoIcon className="mx-auto size-14" />
        <p className="mt-3 text-center font-sans text-xl font-medium text-foreground md:text-2xl">
          Not Authorized!
        </p>
        <p>Log in to access dashboard</p>
        <Button
          className="mx-auto mt-6 w-fit"
          onClick={() => router.push('/login')}
        >
          Log In
        </Button>
      </div>
    );
  }

  return content;
}
