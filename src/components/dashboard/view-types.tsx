'use client';

import { motion } from 'framer-motion';
import { GridIcon, ListIcon } from 'lucide-react';

import useQueryParams from '~/hooks/useQueryParams';

import { Button } from '../ui/button';

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
      <Button
        variant="ghost"
        className="h-fit bg-transparent p-1 focus-visible:ring-1 focus-visible:ring-offset-1"
        onClick={() => handleViewTypeChange('grid')}
      >
        GRID
      </Button>
      <div className="flex h-9 items-center gap-1 rounded-lg bg-background p-1 dark:bg-background/90">
        <Button
          variant="ghost"
          className="relative h-fit bg-transparent p-1 focus-visible:ring-1 focus-visible:ring-offset-1 [&:not(:disabled)]:hover:bg-transparent"
          onClick={() => handleViewTypeChange('grid')}
        >
          {queryParams.view !== 'list' && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-md bg-accent"
              layout="position"
              layoutId="display-style"
              transition={{
                layout: { type: 'spring', duration: 0.5 },
              }}
            />
          )}
          <GridIcon size={20} className="relative z-[1]" />
        </Button>
        <Button
          variant="ghost"
          className="relative h-fit bg-transparent p-1 focus-visible:ring-1 focus-visible:ring-offset-1 [&:not(:disabled)]:hover:bg-transparent"
          onClick={() => handleViewTypeChange('list')}
        >
          {queryParams.view === 'list' && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-md bg-accent"
              layout="position"
              layoutId="display-style"
              transition={{
                layout: { type: 'spring', duration: 0.5 },
              }}
            />
          )}
          <ListIcon size={20} className="relative z-[1]" />
        </Button>
      </div>
      <Button
        variant="ghost"
        className="h-fit bg-transparent p-1 focus-visible:ring-1 focus-visible:ring-offset-1"
        onClick={() => handleViewTypeChange('list')}
      >
        LIST
      </Button>
    </div>
  );
}
