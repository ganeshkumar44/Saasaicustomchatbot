import { useMemo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';

interface ChatbotListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MOBILE_VISIBLE_PAGES = 5;

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number,
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function ChatbotListPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ChatbotListPaginationProps) {
  const mobilePages = useMemo(
    () => getVisiblePages(currentPage, totalPages, MOBILE_VISIBLE_PAGES),
    [currentPage, totalPages],
  );
  const desktopPages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center pt-6">
      <Pagination>
        <PaginationContent className="gap-0.5 md:gap-1 flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={`h-8 min-w-8 px-2 text-xs md:h-9 md:min-w-9 md:px-2.5 md:text-sm ${
                currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
              }`}
            />
          </PaginationItem>

          {/* Mobile: compact window of up to 5 pages */}
          {mobilePages.map((page) => (
            <PaginationItem key={`mobile-${page}`} className="md:hidden">
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(page);
                }}
                className="h-8 w-8 text-xs"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Tablet/desktop: full page list */}
          {desktopPages.map((page) => (
            <PaginationItem key={`desktop-${page}`} className="hidden md:list-item">
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={`h-8 min-w-8 px-2 text-xs md:h-9 md:min-w-9 md:px-2.5 md:text-sm ${
                currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
