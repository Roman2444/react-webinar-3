import React from 'react';
import "./style.css";

const Pagination = ({ totalGoods, page, setPage, limit }) => {
  //получаем общее количество страниц 
  const totalPages = Math.ceil(totalGoods / limit);

  const getPagesArray = (totalPages) => {
    const pages = [];

    // определение начальной и конечной страницы которая будет отображаться
    // в пагинации, чтобы была не меньше 1 и не больше максимальной
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, page + 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

// случай когда начальная страница 1 и д.б. пагинация на 3
    if (page === 1) {
      pages.push(3);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="Pagination">
      {pagesArray.map((pageNumber, index) => {

        if (pageNumber === "...") {
          return <span key={index}>&hellip;</span>;
        }

        return (
          <div
            onClick={() => setPage(pageNumber)}
            className={`Pagination-block${pageNumber === page ? " selected" : ""}`}
            key={index}
          >
            {pageNumber}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;