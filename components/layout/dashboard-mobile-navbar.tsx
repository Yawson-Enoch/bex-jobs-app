'use client';

import Link from 'next/link';
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

import useAuth from '@/hooks/useAuth';

import GradientLogo from '../common/gradient-logo';
import { Button } from '../ui/button';
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

  return (
    <nav
      id="mobile-navbar"
      className="fixed inset-0 flex max-h-screen flex-col gap-6 overflow-y-scroll overscroll-y-contain bg-background md:hidden"
    >
      <div className="container flex h-16 items-center justify-between border-b">
        <button
          onClick={() => {
            router.push('/dashboard');
            setIsMobileNavbarOpen(false);
          }}
        >
          <GradientLogo />
        </button>
        <Button
          aria-expanded={isMobileNavbarOpen}
          aria-controls="mobile-navbar"
          size="sm"
          variant="ghost"
          className="aspect-square p-1 text-error-foreground"
          onClick={() => setIsMobileNavbarOpen(false)}
        >
          <span className="sr-only">Close Mobile Navbar</span>
          <XIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="container space-y-6">
        {isCheckingAuth ? (
          <div role="status">
            <span className="sr-only">Loading user info...</span>
            <LoaderIcon
              aria-hidden="true"
              className="mr-2 h-5 w-5 animate-spin"
            />
          </div>
        ) : (
          <p className="px-2 text-2xl font-bold">
            Hi, {userAuthInfo?.username}
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
                    layout="position"
                    layoutId="dashboard-mobile-navbar-link"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{
                      type: 'spring',
                      duration: 0.75,
                      ease: 'easeInOut',
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
      </div>
    </nav>
  );
}
