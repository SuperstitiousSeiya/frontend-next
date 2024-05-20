"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Row {
  department: string;
  region: string;
  position: string;
  itemNumber: string;
  startDate: string;
  endDate: string;
  school: string;
  buttonId: string;
}

interface TableProps {
  currentPage: string;
  totalPages: number | undefined;
  data: Row[];
}

const TableComponent: React.FC<TableProps> = ({
  currentPage,
  totalPages,
  data,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePrevPage = () => {};

  const handleNextPage = () => {};

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePageClick = (pageNumber: string) => {
    router.replace(pathname + "?" + createQueryString("page", pageNumber));
  };

  const renderPageNumbers = () => {
    if (!totalPages) return null;

    const maxVisiblePages = 5; 
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, parseInt(currentPage) - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];

    if (parseInt(currentPage) > halfMaxVisiblePages) {
      pageNumbers.push(1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (parseInt(currentPage) < totalPages - halfMaxVisiblePages) {
      pageNumbers.push(totalPages + 1);
    }

    return pageNumbers.map((page) => (
      <li
        key={page}
        className={
          parseInt(currentPage) === page
            ? "bg-white text-black px-4 py-2"
            : "p-4 py-2"
        }
        onClick={() => handlePageClick(String(page))}
      >
        <button>{page}</button>
      </li>
    ));
  };

  const renderTableData = useCallback(() => {
    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.department}</td>
        <td>{row.region}</td>
        <td>{row.position}</td>
        <td>{row.itemNumber}</td>
        <td>{row.startDate}</td>
        <td>{row.endDate}</td>
        <td>{row.school}</td>
        <td>
          <a
            href={`https://csc.gov.ph/career/job/${row.buttonId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Details
          </a>
        </td>
      </tr>
    ));
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Region</th>
            <th>Position</th>
            <th>Item Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>School</th>
            <th>Button ID</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={parseInt(currentPage) === 1}>
          Prev
        </button>
        <ul className="flex gap-4">{renderPageNumbers()}</ul>
        <button
          onClick={handleNextPage}
          disabled={parseInt(currentPage) === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
