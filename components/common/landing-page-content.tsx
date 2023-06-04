'use client';

import Link from 'next/link';
import { Variants, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import useAuth from '@/hooks/useAuth';
import useMediaQuery from '@/hooks/useMediaQuery';

import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

const MotionLink = motion(Link);

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
    transition: { duration: 0.6, ease: 'easeOut' },
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

export default function LandingPageContent() {
  const { matches } = useMediaQuery('(max-width: 480px)');
  const isMobile = matches;

  const { isLoggedIn } = useAuth();

  return (
    <motion.div
      variants={mainContainer}
      animate="animate"
      initial="initial"
      className="flex flex-col gap-3 md:gap-6"
    >
      <motion.div
        className="space-y-1 text-center text-3xl font-bold md:space-y-3 md:text-4xl"
        variants={headingContainer(isMobile)}
      >
        <motion.h1
          variants={headingTitle(isMobile)}
          className="scroll-m-20 bg-gradient-to-tr from-transparent to-foreground to-70% bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl"
        >
          BexJobs
        </motion.h1>
        <Separator
          orientation="horizontal"
          className="mx-auto w-1/2 md:w-1/4"
        />
        <motion.h2
          variants={headingDescription}
          className="scroll-m-20 text-3xl font-semibold tracking-tight"
        >
          Effortlessly Manage Your Job Search
        </motion.h2>
      </motion.div>
      <p className="md:text-center">
        BexJobs is a user-friendly job search management tool designed to help
        you keep track of all your job applications in one place. With BexJobs,
        you can easily add job listings and track their status, whether
        it&apos;s pending, interview scheduled, or declined. Say goodbye to the
        hassle of managing your job search with spreadsheets or sticky notes,
        and say hello to BexJobs - your ultimate job search companion.
      </p>
      <MotionLink
        href={isLoggedIn ? '/dashboard' : '/login'}
        className={twMerge(
          buttonVariants({ size: 'lg' }),
          'mx-auto font-medium md:text-lg'
        )}
        variants={mainLink}
      >
        Start Managing Your Jobs
      </MotionLink>
    </motion.div>
  );
}
