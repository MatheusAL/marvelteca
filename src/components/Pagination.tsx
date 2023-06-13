import { useState } from "react";

interface PaginationProps {
  totalCharacters: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
export default function Pagination({
  totalCharacters,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  const [charactersPerPage] = useState(50);
  let pages = [];
  console.log(totalCharacters);
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex flex-wrap justify-center">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage
                ? "mx-2 px-2 text-black bg-white border border-black rounded-lg"
                : "mx-2 px-2 text-white bg-black border border-black hover:bg-white hover:text-black rounded-lg"
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
