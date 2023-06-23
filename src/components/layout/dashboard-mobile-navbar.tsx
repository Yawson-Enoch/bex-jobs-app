'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  BarChart3Icon,
  BriefcaseIcon,
  LoaderIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
  XIcon,
} from 'lucide-react';

import useAuth from '~/hooks/useAuth';
import useLockBodyScroll from '~/hooks/useLockBodyScroll';

import GradientLogo from '../common/gradient-logo';
import { Separator } from '../ui/separator';
import { isMobileNavbarOpenAtom } from './dashboard-header';

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

export default function DashboardMobileNavbar() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useAtom(
    isMobileNavbarOpenAtom
  );

  const { isCheckingAuth, userAuthInfo, logOut } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  useLockBodyScroll();

  return (
    <nav
      id="mobile-navbar"
      className="fixed inset-0 z-10 flex max-h-screen flex-col gap-6 overflow-y-auto overscroll-y-contain bg-background/90 pb-4 backdrop-blur-sm dark:bg-background/70 md:hidden"
    >
      <section className="h-16 border-b">
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
            className="text-error-foreground"
            onClick={() => setIsMobileNavbarOpen(false)}
          >
            <span className="sr-only">Close Mobile Navbar</span>
            <XIcon aria-hidden="true" />
          </button>
        </div>
      </section>
      <section className="container space-y-6">
        {isCheckingAuth ? (
          <div role="status">
            <span className="sr-only">Loading user info...</span>
            <LoaderIcon
              aria-hidden="true"
              className="mr-2 h-5 w-5 animate-spin"
            />
          </div>
        ) : (
          <p className="px-2 text-xl font-medium">
            Hi,{' '}
            <span className="text-foreground">{userAuthInfo?.firstName}</span>
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
                    router.push(navLink.path);
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
