import React, {useMemo} from "react";
import "./style.css";
import {getPagesArray} from "../../utils";

const Pagination = ({ totalPages, page, setPage }) => {
  const pagesArray = useMemo(() => {
    return getPagesArray(totalPages, page);
  }, [totalPages, page]);

  return (
    <div className="Pagination">
      {pagesArray.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <div className="Pagination-block-empty" key={pageNumber + index}>
              {pageNumber}
            </div>
          );
        }

        return (
          <div
            onClick={() => setPage(pageNumber)}
            className={`Pagination-block${
              pageNumber === page ? " selected" : ""
            }`}
            key={pageNumber + index}
          >
            {pageNumber}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
