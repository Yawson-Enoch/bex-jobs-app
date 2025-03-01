'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import {
  BarChart3Icon,
  BriefcaseIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { isSidebarExpandedAtom } from '~/atoms/sidebar';
import useAuth from '~/hooks/useAuth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import GradientLogo from '~/components/common/gradient-logo';
import logo from '~/public/assets/logo.png';

const sidebarRoutes = [
  {
    title: 'Dashboard',
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

export default function Sidebar() {
  const isSidebarExpanded = useAtomValue(isSidebarExpandedAtom);

  const { logout } = useAuth();

  const pathname = usePathname();

  return (
    <aside
      id="dashboard-sidebar"
      className={twMerge(
        'dashboard-sidebar sticky top-0 hidden max-h-dvh overflow-y-auto overscroll-y-contain border-r transition-[width] md:flex md:flex-col md:gap-12',
        isSidebarExpanded ? 'w-52 lg:w-60' : 'w-20',
      )}
    >
      <div
        className={twMerge(
          'flex h-16 items-center py-4 pl-4',
          !isSidebarExpanded && 'justify-center px-4',
        )}
      >
        {isSidebarExpanded ? (
          <Link href="/dashboard">
            <GradientLogo />
          </Link>
        ) : (
          <Link href="/dashboard">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              placeholder="blur"
            />
          </Link>
        )}
      </div>
      <ul className="flex h-full flex-col gap-4 p-4 font-medium">
        {sidebarRoutes.map((sidebarRoute) => {
          return (
            <li
              key={sidebarRoute.title}
              className={twMerge(
                'relative',
                isSidebarExpanded ? 'w-full' : 'w-fit',
              )}
            >
              {pathname === sidebarRoute.path && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-accent"
                  layout="position"
                  layoutId="dashboard-sidebar-link"
                  layoutDependency={sidebarRoute.path}
                  transition={{
                    layout: { type: 'tween', duration: 0.5, ease: 'easeOut' },
                  }}
                />
              )}
              <Link
                href={sidebarRoute.path}
                className="group relative z-10 flex items-center gap-3 rounded-md p-2"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-linear group-hover:rotate-12"
                >
                  {sidebarRoute.icon}
                </span>
                <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                  {sidebarRoute.title}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="mt-auto space-y-4">
          <Separator />
          {isSidebarExpanded ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={twMerge(
                    'group flex items-center justify-start gap-3 p-2',
                    isSidebarExpanded ? 'w-full' : 'w-fit',
                  )}
                >
                  <LogOutIcon
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-linear group-hover:rotate-12"
                  />
                  <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                    Logout
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Logout Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Would you like to conclude your current session and close
                    the page?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full sm:w-auto">
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>
                    Yes, Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <AlertDialogTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={twMerge(
                          'group flex items-center justify-start gap-3 p-2',
                          isSidebarExpanded ? 'w-full' : 'w-fit',
                        )}
                      >
                        <LogOutIcon
                          aria-hidden="true"
                          className="transition-transform duration-300 ease-linear group-hover:rotate-12"
                        />
                        <span
                          className={twMerge(!isSidebarExpanded && 'hidden')}
                        >
                          Logout
                        </span>
                      </Button>
                    </TooltipTrigger>
                  </AlertDialogTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="relative -top-3.5"
                  >
                    <span>Log out</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Logout Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Would you like to conclude your current session and close
                    the page?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full sm:w-auto">
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>
                    Yes, Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </li>
      </ul>
    </aside>
  );
}
