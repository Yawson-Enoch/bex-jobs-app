'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  BarChart3Icon,
  BriefcaseIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useAuth from '~/hooks/useAuth';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import GradientLogo from '~/components/common/gradient-logo';

const sidebarRoutes = [
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

export const isSidebarExpandedAtom = atomWithStorage('bexjobs-sidebar', true);

export default function Sidebar() {
  const isSidebarExpanded = useAtomValue(isSidebarExpandedAtom);

  const { logOut } = useAuth();

  const pathname = usePathname();

  return (
    <aside
      id="dashboard-sidebar"
      className={twMerge(
        'dashboard-sidebar max-h-dm sticky top-0 hidden overflow-y-auto overscroll-y-contain border-r bg-background/70 pt-3 md:flex md:flex-col md:gap-12',
        isSidebarExpanded ? 'w-52 lg:w-60' : 'w-20'
      )}
    >
      <div
        className={twMerge(
          'flex items-center pl-4',
          !isSidebarExpanded && 'justify-center px-4'
        )}
      >
        {isSidebarExpanded ? (
          <Link href="/dashboard">
            <GradientLogo />
          </Link>
        ) : (
          <Link href="/" className="relative inline-block aspect-square w-10">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              priority
              sizes="(max-width: 768px) 35vw,
              (max-width: 1200px) 10vw,
              50vw"
              className="object-contain"
            />
          </Link>
        )}
      </div>
      <ul className="flex flex-col gap-4 p-4 font-medium">
        {sidebarRoutes.map((sidebarRoute) => {
          return (
            <li
              key={sidebarRoute.title}
              className={twMerge(
                'relative',
                isSidebarExpanded ? 'w-full' : 'w-fit'
              )}
            >
              {pathname === sidebarRoute.path && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-accent"
                  layout="position"
                  layoutId="dashboard-sidebar-link"
                  transition={{
                    layout: { type: 'spring', duration: 0.5 },
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
        <li className="space-y-4">
          <Separator />
          {isSidebarExpanded ? (
            <Button
              variant="ghost"
              className={twMerge(
                'group flex items-center justify-start gap-3 p-2',
                isSidebarExpanded ? 'w-full' : 'w-fit'
              )}
              onClick={() => logOut()}
            >
              <LogOutIcon
                aria-hidden="true"
                className="transition-transform duration-300 ease-linear group-hover:rotate-12"
              />
              <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                Logout
              </span>
            </Button>
          ) : (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <Button
                  asChild
                  variant="ghost"
                  className={twMerge(
                    'group flex items-center justify-start gap-3 p-2',
                    isSidebarExpanded ? 'w-full' : 'w-fit'
                  )}
                  onClick={() => logOut()}
                >
                  <TooltipTrigger>
                    <LogOutIcon
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-linear group-hover:rotate-12"
                    />
                    <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                      Logout
                    </span>
                  </TooltipTrigger>
                </Button>
                <TooltipContent side="right" align="start" alignOffset={-12}>
                  <span>Log out</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </li>
      </ul>
    </aside>
  );
}
