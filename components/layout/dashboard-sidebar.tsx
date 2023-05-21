'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  BriefcaseIcon,
  ChevronRightIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import GradientLogo from '../common/gradient-logo';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const sidebarItems = [
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

export default function DashboardSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.aside
      id="dashboard-sidebar"
      layoutId="dashboard-sidebar"
      transition={{
        layout: { duration: 0.09 },
      }}
      className={twMerge(
        'dashboard-sidebar sticky top-0 hidden max-h-screen overflow-y-scroll overscroll-y-contain border-r pt-3 md:flex md:flex-col',
        isExpanded ? 'w-52 lg:w-60' : 'w-20'
      )}
    >
      <div
        className={twMerge(
          'flex items-center pl-4',
          !isExpanded && 'justify-center px-4'
        )}
      >
        <div
          className={twMerge(
            'animate-in slide-in-from-right-4 duration-300 ease-linear',
            !isExpanded && 'hidden'
          )}
        >
          <GradientLogo />
        </div>
        <Button
          aria-expanded={isExpanded}
          aria-controls="dashboard-sidebar"
          size="sm"
          className={twMerge(
            'p-2',
            isExpanded && 'ml-auto rounded-lg rounded-r-none p-0'
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="sr-only">Toggle Sidebar</span>
          <motion.span
            aria-hidden="true"
            layout
            transition={{
              layout: { duration: 0.09 },
            }}
          >
            <ChevronRightIcon className={twMerge(isExpanded && 'rotate-180')} />
          </motion.span>
        </Button>
      </div>
      <ul
        className={twMerge(
          'my-auto flex flex-col gap-3 overflow-hidden px-4',
          !isExpanded && 'items-center'
        )}
      >
        {sidebarItems.map((sidebarItem) => {
          return (
            <li
              key={sidebarItem.title}
              className="rounded-md p-2 hover:bg-accent/75"
            >
              <Link href={sidebarItem.path} className="flex items-center gap-3">
                <motion.span
                  aria-hidden="true"
                  layout
                  transition={{
                    layout: { duration: 0.09 },
                  }}
                >
                  {sidebarItem.icon}
                </motion.span>
                <span
                  className={twMerge(
                    'animate-in fade-in-0 duration-500 ease-linear',
                    !isExpanded && 'hidden'
                  )}
                >
                  {sidebarItem.title}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="space-y-3">
          <Separator />
          <button className="flex w-full items-center gap-3 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-accent/75">
            <motion.span
              aria-hidden="true"
              layout
              transition={{
                layout: { duration: 0.09 },
              }}
            >
              <LogOutIcon />
            </motion.span>
            <span
              className={twMerge(
                'animate-in fade-in-0 duration-500 ease-linear',
                !isExpanded && 'hidden'
              )}
            >
              Logout
            </span>
          </button>
        </li>
      </ul>
    </motion.aside>
  );
}
