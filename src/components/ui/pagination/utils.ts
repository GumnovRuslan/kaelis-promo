type PaginationItem = number | string;

type TProps = {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  edgeCount?: number;
  sign?: string;
};

export function getPaginationRange({
  currentPage,
  totalPages,
  siblingCount = 1,
  edgeCount = 0,
  sign = '...',
}: TProps): PaginationItem[] {
  if (currentPage > totalPages || currentPage < 1 || totalPages < 1) {
    console.error(
      'Pagination is not valid data',
      `currentPage: ${currentPage}`,
      `totalPages: ${totalPages}`,
    );
    return [];
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const range: PaginationItem[] = [];
  let skipCount = 0;

  for (let i = 1; i <= totalPages; i++) {
    const isEdgePage = i <= 1 + edgeCount || i >= totalPages - edgeCount;
    const isSiblingPage = i >= leftSibling && i <= rightSibling;
    const shouldInclude = isEdgePage || isSiblingPage;

    if (shouldInclude) {
      if (skipCount > 0) {
        range.push(sign);
        skipCount = 0;
      }
      range.push(i);
    } else {
      skipCount++;
    }
  }

  return range;
}