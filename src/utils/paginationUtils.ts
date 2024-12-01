export const calculatePaginationList = (
  total_pages: number,
  page: number,
): number[] => {
  const totalPages = Math.max(total_pages, 1);
  const currentPage = Math.max(page, 1);
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 3);

  if (totalPages <= 1) {
    return [1];
  }

  if (end - start + 1 < 4) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  return Array.from({ length: 4 }, (_, index) => start + index);
};
