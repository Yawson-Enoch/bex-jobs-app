'use client';

import { Variants, motion } from 'framer-motion';

export default function AnimateCharacters({ text }: { text: string }) {
  return (
    <div className="rounded-md">
      <span className="sr-only">{text}</span>
      <p aria-hidden="true">
        {Array.from(text).map((char, index) => {
          return (
            <motion.span
              key={index}
              variants={letter}
              initial="initial"
              animate="animate"
              custom={index}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}

const letter: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      delay: 0.07 * custom,
    },
  }),
};
