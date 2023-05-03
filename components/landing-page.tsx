'use client';

import { useRouter } from 'next/navigation';
import { Variants, motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Button } from './ui/button';

const MotionBtn = motion(Button);

export default function LandingPage() {
  const { value } = useMediaQuery('(max-width: 767px)');
  /* used to get the right value on browser resize as matches initially returns false even in mobile mode in devtools */
  const isMobile = value <= 767;

  const router = useRouter();

  return (
    <motion.section
      variants={mainContainer}
      animate="animate"
      initial="initial"
      className="container space-y-7 py-5 text-center"
    >
      <motion.div
        className="flex flex-col justify-center gap-2 text-2xl font-bold lg:flex-row lg:items-center lg:gap-3 lg:text-4xl"
        variants={headingContainer(isMobile)}
      >
        <motion.p variants={headingTitle(isMobile)}>BexJobs</motion.p>
        <motion.span variants={headingDash}>&ndash;</motion.span>
        <motion.p variants={headingDescription(isMobile)}>
          Effortlessly Manage Your Job Search
        </motion.p>
      </motion.div>
      <motion.p
        variants={mainDescription(isMobile)}
        className="text-muted-foreground lg:text-lg"
      >
        BexJobs is a user-friendly job search management tool designed to help
        you keep track of all your job applications in one place. With BexJobs,
        you can easily add job listings and track their status, whether
        it&apos;s pending, interview scheduled, or declined. Say goodbye to the
        hassle of managing your job search with spreadsheets or sticky notes,
        and say hello to BexJobs - your ultimate job search companion.
      </motion.p>
      <MotionBtn
        variants={mainBtn}
        type="button"
        size="lg"
        className="lg:text-lg"
        onClick={() => router.push('/signup')}
      >
        Start Managing Your Jobs
      </MotionBtn>
    </motion.section>
  );
}

const mainContainer: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 1.25,
    },
  },
};

const mainDescription = (isMobile: boolean): Variants => ({
  initial: {
    opacity: 0,
    x: isMobile ? 10 : -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.25 },
  },
});

const mainBtn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.25 },
  },
};

const headingContainer = (isMobile: boolean): Variants => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.25,
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
          transition: { duration: 1.25 },
        },
      };
};

const headingDash: Variants = {
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

const headingDescription = (isMobile: boolean): Variants => ({
  initial: {
    opacity: 0,
    x: isMobile ? -10 : 200,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', bounce: 0.25 },
  },
});
