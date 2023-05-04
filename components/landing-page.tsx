'use client';

import { useRouter } from 'next/navigation';
import { Variants, motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
        className="space-y-2 text-2xl font-bold lg:space-y-3 lg:text-4xl"
        variants={headingContainer(isMobile)}
      >
        <motion.p variants={headingTitle(isMobile)}>BexJobs</motion.p>
        <Separator
          orientation="horizontal"
          className="mx-auto w-1/2 lg:w-1/4"
        />
        <motion.p variants={headingDescription(isMobile)}>
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
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.75,
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const mainBtn: Variants = {
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
    opacity: 0,
    scale: 0.25,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.25,
      staggerDirection: isMobile ? 1 : -1,
      transition: { duration: 0.3, ease: 'easeOut' },
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
