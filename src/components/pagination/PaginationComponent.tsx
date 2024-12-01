// Pagination.tsx
import React from "react";
import { calculatePaginationList } from "../../utils/paginationUtils";
import { PaginationProps } from "../../constants/interfaces";

const PaginationComponent: React.FC<PaginationProps> = ({
  pagination,
  setPage,
}) => {
  const paginationList = calculatePaginationList(
    pagination.total_pages,
    pagination.current_page,
  );

  const nextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setPage(pagination.current_page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.current_page > 1) {
      setPage(pagination.current_page - 1);
    }
  };

  return (
    <div className="button-pagination">
      {pagination.current_page > 1 && (
        <button onClick={prevPage} className="arrow-btn">
          &lt;
        </button>
      )}
      {paginationList.map((pag) => (
        <button
          key={pag}
          onClick={() => setPage(pag)}
          className={
            pag === pagination.current_page ? "active-btn" : "page-btn"
          }
        >
          {pag}
        </button>
      ))}
      <button
        onClick={nextPage}
        className="arrow-btn"
        disabled={pagination.current_page === pagination.total_pages}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationComponent;
