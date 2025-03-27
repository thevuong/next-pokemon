import queryString from 'query-string';

import { API_CONSTANTS } from '@/data/services/pokemon/constants';

/**
 * Reusable fetcher function for API requests
 * @param url - The URL to fetch data from
 * @param options - Additional fetch options
 * @returns Promise with the parsed JSON response
 * @throws Error if the request fails
 */
export async function apiFetcher<T>(url: string, options = {}): Promise<T> {
  try {
    const defaultOptions = {
      next: { revalidate: API_CONSTANTS.DEFAULT_CACHE_TIME },
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
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
