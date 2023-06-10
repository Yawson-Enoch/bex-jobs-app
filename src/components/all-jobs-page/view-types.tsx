'use client';

import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { GridIcon, ListIcon } from 'lucide-react';

const displayStyleAtom = atom<'grid' | 'list'>('grid');

export default function ViewTypes() {
  const [displayStyle, setDisplayStyle] = useAtom(displayStyleAtom);

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setDisplayStyle('grid')} className="text-sm">
        GRID
      </button>
      <div className="flex h-9 items-center gap-1 rounded-md bg-background p-1">
        <button
          className="relative rounded-sm p-1"
          onClick={() => setDisplayStyle('grid')}
        >
          {displayStyle === 'grid' && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-sm bg-accent"
              layout="position"
              layoutId="display-style"
              transition={{
                layout: { type: 'spring', duration: 0.5 },
              }}
            />
          )}
          <GridIcon size={20} className="relative z-[1]" />
        </button>
        <button
          className="relative rounded-sm p-1"
          onClick={() => setDisplayStyle('list')}
        >
          {displayStyle === 'list' && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-sm bg-accent"
              layout="position"
              layoutId="display-style"
              transition={{
                layout: { type: 'spring', duration: 0.5 },
              }}
            />
          )}
          <ListIcon size={20} className="relative z-[1]" />
        </button>
      </div>
      <button onClick={() => setDisplayStyle('list')} className="text-sm">
        LIST
      </button>
    </div>
  );
}
