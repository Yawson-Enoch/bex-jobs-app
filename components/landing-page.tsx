'use client';

import Link from 'next/link';
import { Variants, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import useAuth from '@/hooks/useAuth';
import useMediaQuery from '@/hooks/useMediaQuery';

import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

const MotionLink = motion(Link);

export default function LandingPage() {
  const { matches } = useMediaQuery('(max-width: 767px)');

  const { isLoggedIn } = useAuth();
  const isMobile = matches;

  return (
    <motion.main
      variants={mainContainer}
      animate="animate"
      initial="initial"
      className="container space-y-3 py-4 text-center md:space-y-5"
    >
      <motion.div
        className="space-y-1 text-2xl font-bold md:space-y-3 lg:text-4xl"
        variants={headingContainer(isMobile)}
      >
        <motion.p variants={headingTitle(isMobile)}>BexJobs</motion.p>
        <Separator
          orientation="horizontal"
          className="mx-auto w-1/2 lg:w-1/4"
        />
        <motion.p variants={headingDescription}>
          Effortlessly Manage Your Job Search
        </motion.p>
      </motion.div>
      <p className="text-muted-foreground lg:text-lg">
        BexJobs is a user-friendly job search management tool designed to help
        you keep track of all your job applications in one place. With BexJobs,
        you can easily add job listings and track their status, whether
        it&apos;s pending, interview scheduled, or declined. Say goodbye to the
        hassle of managing your job search with spreadsheets or sticky notes,
        and say hello to BexJobs - your ultimate job search companion.
      </p>
      <MotionLink
        href={isLoggedIn ? '/dashboard' : '/login'}
        className={twMerge(buttonVariants({ size: 'lg' }), 'lg:text-lg')}
        variants={mainLink}
      >
        Start Managing Your Jobs
      </MotionLink>
    </motion.main>
  );
}

const mainContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 1.85,
    },
  },
};

const mainLink: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const headingContainer = (isMobile: boolean): Variants => ({
  initial: {
    scaleX: 0.25,
  },
  animate: {
    scaleX: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.65,
      staggerDirection: isMobile ? 1 : -1,
    },
  },
});

const headingTitle = (isMobile: boolean): Variants => {
  return isMobile
    ? {
        initial: {
          opacity: 0,
          x: 10,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: { type: 'spring', bounce: 0.25 },
        },
      }
    : {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          rotateX: [0, 45, 0, -45, 0],
          transition: { duration: 1 },
        },
      };
};

const headingDescription: Variants = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};
