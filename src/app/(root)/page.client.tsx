'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useAtomValue } from 'jotai';

import { demoAppAtom } from '~/atoms/demo-app';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

const DemoApp = dynamic(() => import('~/components/common/demo-app'), {
  ssr: false,
});

const MotionLink = motion.create(Link);

const mainContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 1.5,
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

const headingContainer: Variants = {
  initial: {
    scaleX: 0.25,
  },
  animate: {
    scaleX: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.7,
    },
  },
};

const headingTitle: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    rotateX: [0, 45, 0, -45, 0],
    transition: { duration: 0.5 },
  },
};

const headingDescription: Variants = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export default function IndexPageClient() {
  const isDemoApp = useAtomValue(demoAppAtom);

  return (
    <>
      <motion.div
        variants={mainContainer}
        animate="animate"
        initial="initial"
        className="grid h-full content-center gap-3 md:gap-6"
      >
        <motion.div
          className="space-y-1 text-center text-3xl font-bold md:space-y-3 md:text-4xl"
          variants={headingContainer}
        >
          <motion.h1
            variants={headingTitle}
            className="mx-auto w-fit bg-gradient-to-b from-transparent to-foreground bg-clip-text text-transparent"
          >
            BexJobs
          </motion.h1>
          <Separator
            orientation="horizontal"
            className="mx-auto w-1/2 md:w-1/4"
          />
          <motion.h2 variants={headingDescription}>
            Effortlessly Manage Your Job Search
          </motion.h2>
        </motion.div>
        <p className="md:text-center">
          BexJobs is a user-friendly job search management tool designed to help
          you keep track of all your job applications in one place. With
          BexJobs, you can easily add job listings and track their status,
          whether it&apos;s pending, interview scheduled, or declined. Say
          goodbye to the hassle of managing your job search with spreadsheets or
          sticky notes, and say hello to BexJobs - your ultimate job search
          companion.
        </p>
        <Button
          asChild
          size="lg"
          className="mx-auto bg-gradient-to-r from-primary to-secondary font-bold md:text-lg"
        >
          <MotionLink href="/dashboard" variants={mainLink}>
            Start Managing Your Jobs
          </MotionLink>
        </Button>
      </motion.div>
      {isDemoApp && <DemoApp />}
    </>
  );
}
