'use client';

import { Variants, motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import SignUpCTABtn from './signup-CTA-btn';

export const headingContainer = (isMobile: boolean): Variants => {
  return isMobile
    ? {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            staggerChildren: 0.3,
            staggerDirection: 1,
          },
        },
      }
    : {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            staggerChildren: 0.25,
            staggerDirection: -1,
          },
        },
      };
};

export const title = (isMobile: boolean) => {
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
          transition: { duration: 1.25 },
        },
      };
};

export const dash = (isMobile: boolean) => {
  return isMobile
    ? {
        initial: {
          opacity: 0,
          scale: 0.5,
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', bounce: 0.25 },
        },
      }
    : {
        initial: {
          opacity: 0,
          scale: 0.5,
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', bounce: 0.25 },
        },
      };
};

export const description = (isMobile: boolean): Variants => {
  return isMobile
    ? {
        initial: {
          opacity: 0,
          x: -10,
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
          x: 200,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: { type: 'spring', bounce: 0.25 },
        },
      };
};

export default function LandingPage() {
  const { value } = useMediaQuery('(max-width: 767px)');
  /* used to get the right value on browser resize as matches initially returns false even in mobile mode in devtools */
  const isMobile = value <= 767;

  return (
    <section className="container space-y-7 py-5 text-center">
      <motion.div
        className="flex flex-col justify-center gap-2 text-2xl font-bold lg:flex-row lg:items-center lg:gap-3 lg:text-4xl"
        variants={headingContainer(isMobile)}
        animate="animate"
        initial="initial"
      >
        <motion.p variants={title(isMobile)}>BexJobs</motion.p>
        <motion.span variants={dash(isMobile)}>-</motion.span>
        <motion.p variants={description(isMobile)}>
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
      <SignUpCTABtn>Start Managing Your Jobs</SignUpCTABtn>
    </section>
  );
}
