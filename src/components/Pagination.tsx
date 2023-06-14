import { useState } from "react";

interface PaginationProps {
  totalCharacters: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  displayLimit: number;
}
export default function Pagination({
  totalCharacters,
  setCurrentPage,
  currentPage,
  displayLimit,
}: PaginationProps) {
  const pagesNumber = Math.ceil(totalCharacters / displayLimit);

  const isFinalPage = () => {
    return currentPage + 1 === pagesNumber || pagesNumber === 1;
  };
  const isFirstPage = () => {
    return currentPage === 1;
  };
  return (
    <div className="flex flex-wrap flex-col items-center text-white text-bold justify-center">
      <span className="text-white dark:text-gray-400">
        Mostrando{" "}
        <span className="font-semibold dark:text-white">
          {(currentPage - 1) * 50 + 1}
        </span>{" "}
        até{" "}
        <span className="font-semibold dark:text-white">
          {displayLimit * currentPage}
        </span>{" "}
        de{" "}
        <span className="font-semibold dark:text-white">{totalCharacters}</span>{" "}
        Personagens
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={isFirstPage()}
          className="inline-flex items-center px-4 py-2 font-medium text-white bg-black rounded-l enabled:hover:bg-white enabled:hover:text-black disabled:opacity-75 disabled:bg-gray"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Anterior
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={isFinalPage()}
          className="inline-flex items-center px-4 py-2 font-medium text-white bg-black border-0 border-l border-gray-700 rounded-r enabled:hover:bg-white enabled:hover:text-black disabled:opacity-75 disabled:bg-gray"
        >
          Próximo
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
