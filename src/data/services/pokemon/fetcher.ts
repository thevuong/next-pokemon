import queryString from 'query-string';

import type { ApiResponse } from '@/data/services/pokemon/types';

import { API_CONSTANTS } from '@/data/services/pokemon/constants';

/**
 * Reusable fetcher function for API requests
 * @param url - The URL to fetch data from
 * @param options - Additional fetch options
 * @returns ApiResponse object containing data or error information
 */
export async function apiFetcher<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const defaultOptions = {
      next: {
        revalidate: API_CONSTANTS.DEFAULT_CACHE_TIME,
      },
      cache: 'force-cache',
    } satisfies RequestInit;

    const mergedOptions = { ...defaultOptions, ...options };
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}: ${response.statusText}`);

      return {
        data: null,
        error: {
          message: `API request failed with status ${response.status}: ${response.statusText}`,
          status: response.status,
        },
        success: false,
      };
    }

    const data = (await response.json()) as T;

    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);

    return {
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : 'An undefined error occurred while loading data.',
        originalError: error,
      },
      success: false,
    };
  }
}

/**
 * Constructs a full API URL from an endpoint path and query parameters
 * @param endpoint - API endpoint path
 * @param params - Query parameters object
 * @returns Full API URL
 */
export function buildApiUrl(
  endpoint: string,
  params: Record<string, number | string> = {},
): string {
  const baseUrl = `${API_CONSTANTS.BASE_URL}${endpoint}`;

  // If there are no parameters, return the base URL.
  if (Object.keys(params).length === 0) {
    return baseUrl;
  }

  // Use query-string to create a URL with query parameters.
  return queryString.stringifyUrl({
    url: baseUrl,
    query: params,
  });
}
