'use client';

import { motion, Variants } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import ReactPaginate from 'react-paginate';
import { twMerge } from 'tailwind-merge';

import { useGetJobs } from '~/hooks/api/useJobs';
import { useFilter } from '~/hooks/useQueryParams';

const paginationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.25,
    },
  },
};

export default function PaginationButtons() {
  const [_, setFilter] = useFilter();

  const { data: jobs } = useGetJobs();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setFilter({ page: selected + 1 });
  };

  return (
    <motion.div
      variants={paginationVariants}
      initial="initial"
      animate="animate"
    >
      <ReactPaginate
        breakClassName="hidden lg:flex lg:items-center"
        breakLabel={
          <MoreHorizontalIcon size={15} className="text-muted-foreground" />
        }
        nextLabel={
          <>
            <span>NEXT</span>
            <ChevronRightIcon />
          </>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={jobs?.pagination.totalPages || 0}
        previousLabel={
          <>
            <ChevronLeftIcon />
            <span>PREV</span>
          </>
        }
        containerClassName={twMerge(
          'flex items-center justify-center gap-3',
          jobs?.pagination.totalPages === 1 && 'hidden',
        )}
        pageClassName="hidden lg:block"
        pageLinkClassName="w-10 aspect-square lg:flex items-center justify-center rounded-full border hover:bg-accent"
        activeLinkClassName="bg-primary text-primary-foreground border-0 hover:bg-primary/90"
        disabledClassName="pointer-events-none text-muted-foreground"
        previousLinkClassName="flex items-center gap-2"
        nextLinkClassName="flex items-center gap-2"
        renderOnZeroPageCount={null}
      />
    </motion.div>
  );
}
