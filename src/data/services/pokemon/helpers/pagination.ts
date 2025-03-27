/**
 * Check the validity of the pagination parameters
 */
export function validatePaginationParams(offset: number, limit: number): void {
  if (offset < 0) {
    throw new Error('Offset cannot be negative');
  }

  if (limit <= 0) {
    throw new Error('Limit must be greater than 0');
  }
}

/**
 * Applies pagination to a list of IDs
 */
export function paginateIds(ids: string[], offset: number, limit: number): string[] {
  return ids.slice(offset, offset + limit);
}
