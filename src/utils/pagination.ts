export function getTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) {
    return 1;
  }

  return Math.ceil(totalItems / pageSize);
}

export function paginateItems<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): T[] {
  if (pageSize <= 0) {
    return items;
  }

  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
