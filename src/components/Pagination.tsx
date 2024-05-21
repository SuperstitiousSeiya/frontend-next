"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();

  

  const handlePageClick = (pageNumber: string) => {
    router.push("?" + "page="+pageNumber);
  };

  const renderPageNumbers = () => {
    if (!totalPages) return null;
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    const pageNumbers = [];

    if (currentPage > halfMaxVisiblePages) {
      pageNumbers.push(1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - halfMaxVisiblePages) {
      pageNumbers.push(totalPages + 1);
    }

    return pageNumbers.map((page, index) => (
      <li
        key={index}
        className={
          currentPage === page
            ? "bg-white text-black px-4 py-2"
            : "p-4 py-2"
        }
        onClick={() => handlePageClick(String(page))}
      >
        <button>{page}</button>
      </li>
    ));
  };


  const handlePrevPage = () => {}
  const handleNextPage = () => {}

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <ul className="flex gap-4">{renderPageNumbers()}</ul>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
