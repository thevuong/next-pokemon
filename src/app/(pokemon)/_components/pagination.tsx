'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';

import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';

/**
 * Props for the Pagination component
 */
interface PaginationProps {
  /**
   * Number of items displayed per page
   */
  itemsPerPage: number;
  /**
   * Total number of items to paginate through
   */
  totalItems: number;
  /**
   * CSS class name to apply to the pagination container
   */
  className?: string;
}

/**
 * Renders pagination controls with next/previous buttons and current page
 * indicator
 *
 * This component provides navigation between pages while preserving
 * other query parameters in the URL.
 *
 * @param props - Component properties
 * @returns JSX element with pagination controls
 */
export function Pagination({ totalItems, itemsPerPage, className }: PaginationProps): ReactNode {
  const { currentPage, totalPages, hasPreviousPage, hasNextPage, createPageUrl } = usePagination(
    totalItems,
    itemsPerPage,
  );

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center gap-4 py-4', className)}>
      {hasPreviousPage ? (
        <Link
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          href={createPageUrl(currentPage - 1)}
        >
          Previous
        </Link>
      ) : null}

      {hasNextPage ? (
        <Link
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          href={createPageUrl(currentPage + 1)}
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}
