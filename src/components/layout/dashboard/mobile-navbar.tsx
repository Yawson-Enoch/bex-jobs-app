'use client';

import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  BarChart3Icon,
  BriefcaseIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
  XIcon,
} from 'lucide-react';

import { isMobileNavbarOpenAtom } from '~/atoms/mobile-nav';
import { useGetUser } from '~/hooks/api/useAuth';
import useAuth from '~/hooks/useAuth';
import useCustomRouter from '~/hooks/useCustomRouter';
import useLockBodyScroll from '~/hooks/useLockBodyScroll';
import useQueryParams from '~/hooks/useQueryParams';
import ErrorDisplay from '~/components/common/error-display';
import GradientLogo from '~/components/common/gradient-logo';
import LoadingIndicator from '~/components/common/loading-indicator';

const navLinks = [
  {
    title: 'Stats',
    path: '/dashboard',
    icon: <BarChart3Icon />,
  },
  {
    title: 'All Jobs',
    path: '/dashboard/all-jobs',
    icon: <BriefcaseIcon />,
  },
  {
    title: 'Add Job',
    path: '/dashboard/add-job',
    icon: <PlusCircleIcon />,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: <UserCircleIcon />,
  },
];

export default function MobileNavbar() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useAtom(
    isMobileNavbarOpenAtom
  );

  const { logOut } = useAuth();
  const { createQueryParam } = useQueryParams();

  const { isLoading, error, data } = useGetUser();

  const pathname = usePathname();
  const router = useCustomRouter();

  useLockBodyScroll();

  return (
    <nav
      id="mobile-navbar"
      className="max-h-dm fixed inset-0 z-50 flex flex-col gap-6 overflow-y-auto overscroll-y-contain bg-background/90 pb-4 backdrop-blur-sm dark:bg-background/70 md:hidden"
    >
      <section className="h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between">
          <button
            onClick={() => {
              router.push('/dashboard');
              setIsMobileNavbarOpen(false);
            }}
          >
            <GradientLogo />
          </button>
          <button
            aria-expanded={isMobileNavbarOpen}
            aria-controls="mobile-navbar"
            className="text-destructive"
            onClick={() => setIsMobileNavbarOpen(false)}
          >
            <span className="sr-only">Close Mobile Navbar</span>
            <XIcon aria-hidden="true" />
          </button>
        </div>
      </section>
      <section className="container space-y-6">
        {isLoading ? (
          <LoadingIndicator msg="Fetching user..." />
        ) : error instanceof Error ? (
          <ErrorDisplay msg={error.message} />
        ) : (
          <p className="text-lg font-medium sm:text-xl">
            Hi, <span className="text-foreground">{data?.user.firstName}</span>
          </p>
        )}
        <ul className="flex flex-col gap-3 font-medium">
          {navLinks.map((navLink) => {
            return (
              <li
                key={navLink.title}
                className="relative rounded-md p-2"
                onClick={() => {
                  setIsMobileNavbarOpen(false);
                }}
              >
                {pathname === navLink.path && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-accent"
                    layout="position"
                    layoutId="dashboard-mobile-navbar-link"
                    transition={{
                      layout: { duration: 0.3, ease: 'linear' },
                    }}
                  />
                )}
                <button
                  onClick={() => {
                    router.push(
                      navLink.path === '/dashboard/all-jobs'
                        ? navLink.path +
                            '?' +
                            createQueryParam({
                              type: 'all',
                              status: 'all',
                              sort: 'latest',
                              page: 1,
                            })
                        : navLink.path
                    );
                    setIsMobileNavbarOpen(false);
                  }}
                  className="relative z-10 flex items-center gap-3"
                >
                  <span aria-hidden="true">{navLink.icon}</span>
                  <span>{navLink.title}</span>
                </button>
              </li>
            );
          })}
          <li className="space-y-3">
            <Separator />
            <button
              className="flex w-full items-center gap-3 rounded-md p-2 active:bg-accent"
              onClick={() => {
                logOut();
                setIsMobileNavbarOpen(false);
              }}
            >
              <LogOutIcon aria-hidden="true" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </section>
    </nav>
  );
}
