'use client';

import { Variants, motion } from 'framer-motion';

export default function AnimateCharacters({ text }: { text: string }) {
  return (
    <div className="rounded-md">
      <span className="sr-only">{text}</span>
      <motion.p
        aria-hidden="true"
        variants={container}
        initial="initial"
        animate="animate"
      >
        {Array.from(text).map((char, index) => {
          return (
            <motion.span key={index} variants={letter} className="inline-block">
              {char}
            </motion.span>
          );
        })}
      </motion.p>
    </div>
  );
}

const container: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const letter: Variants = {
  initial: {
    opacity: 0,
    y: 13,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};
