'use client';

import { motion } from 'framer-motion';
import { GridIcon, ListIcon } from 'lucide-react';

import useQueryParams from '~/hooks/useQueryParams';

export type TViewTypes = 'grid' | 'list';

export default function ViewTypes() {
  const { setQueryParams, queryParams } = useQueryParams<{
    view: TViewTypes;
  }>();

  const handleViewTypeChange = (option: TViewTypes) => {
    setQueryParams({ view: option });
  };

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => handleViewTypeChange('grid')} className="text-sm">
        GRID
      </button>
      <div className="flex h-9 items-center gap-1 rounded-md bg-background p-1">
        <button
          className="relative rounded-sm p-1"
          onClick={() => handleViewTypeChange('grid')}
        >
          {queryParams.view !== 'list' && (
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
          onClick={() => handleViewTypeChange('list')}
        >
          {queryParams.view === 'list' && (
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
      <button onClick={() => handleViewTypeChange('list')} className="text-sm">
        LIST
      </button>
    </div>
  );
}
