'use client';

import { motion, Variants } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import ReactPaginate from 'react-paginate';

import useQueryParams from '~/hooks/useQueryParams';

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
  const { queryParams, setQueryParams } = useQueryParams<{
    page: number;
  }>();

  const initialPage = queryParams?.page ? queryParams.page - 1 : 0;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setQueryParams({ page: selected + 1 });
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
        pageCount={10}
        previousLabel={
          <>
            <ChevronLeftIcon />
            <span>PREV</span>
          </>
        }
        containerClassName="flex items-center justify-center gap-3"
        pageClassName="hidden lg:block"
        pageLinkClassName="w-10 aspect-square lg:flex items-center justify-center rounded-full border hover:bg-accent"
        activeLinkClassName="bg-primary text-primary-foreground border-0 hover:bg-primary/90"
        disabledClassName="pointer-events-none text-muted-foreground"
        previousLinkClassName="inline-flex items-center gap-2"
        nextLinkClassName="inline-flex items-center gap-2"
        renderOnZeroPageCount={null}
        initialPage={initialPage}
      />
    </motion.div>
  );
}
