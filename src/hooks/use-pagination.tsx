import { usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

import { DEFAULT_PAGE, PAGE_PARAM } from '@/lib/constants/url-params';

/**
 * Custom hook to handle pagination logic
 */
export function usePagination(
  totalItems: number,
  itemsPerPage: number,
): {
  createPageUrl: (targetPage: number) => string;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
} {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get the current page from URL or use default
  const currentPage = Number(searchParams.get(PAGE_PARAM) ?? DEFAULT_PAGE);

  // Calculate pagination metadata
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Generate URL for a specific page while preserving other query params
  const createPageUrl = (targetPage: number): string => {
    const currentParams = queryString.parse(searchParams.toString());

    return queryString.stringifyUrl({
      url: pathname,
      query: {
        ...currentParams,
        [PAGE_PARAM]: targetPage.toString(),
      },
    });
  };

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    createPageUrl,
  };
}
