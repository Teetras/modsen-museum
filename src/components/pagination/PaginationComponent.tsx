import React from "react";
import {
  calculatePaginationList,
  nextPage,
  prevPage,
} from "../../utils/paginationUtils";
import { PaginationProps } from "../../types/interfaces";
import PaginationButton from "./paginationButton/PaginationButton";

const PaginationComponent: React.FC<PaginationProps> = ({
  pagination: { total_pages, current_page },
  setPage,
}) => {
  const paginationList = calculatePaginationList(total_pages, current_page);

  return (
    <nav className="button-pagination" aria-label="Pagination Navigation">
      {current_page > 1 && (
        <PaginationButton onClick={() => setPage(prevPage(current_page))}>
          &lt;
        </PaginationButton>
      )}
      {paginationList.map((pag) => (
        <PaginationButton
          key={pag}
          onClick={() => setPage(pag)}
          isActive={pag === current_page}
          ariaCurrent={pag === current_page ? "page" : undefined}
        >
          {pag}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => setPage(nextPage(current_page, total_pages))}
        disabled={current_page === total_pages}
      >
        &gt;
      </PaginationButton>
    </nav>
  );
};

export default PaginationComponent;
