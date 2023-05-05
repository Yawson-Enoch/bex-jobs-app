'use client';

import { Variants, motion } from 'framer-motion';

export default function AnimateCharacters({ text }: { text: string }) {
  return (
    <motion.p
      variants={container}
      initial="initial"
      animate="animate"
      className="inline-flex"
    >
      {Array.from(text).map((char, index) => {
        return (
          <motion.span key={index} variants={letter}>
            {char}
          </motion.span>
        );
      })}
    </motion.p>
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
