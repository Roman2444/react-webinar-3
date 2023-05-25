import React from 'react';

const Pagination = ({totalGoods, page, setPage, limit}) => {

   //получаем количество страниц(10 можно заменить на limit)
   const totalPages = Math.ceil(totalGoods / limit);

   //получаем массив для пагинации
   const getPagesArray = (totalPages) => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
         pages.push(i);
      }
      return pages;
   }

   const pagesArray = getPagesArray(totalPages);

    return (
        <div className="Pagination">
        {pagesArray.map((el) => (
          <span
            onClick={() => setPage(el)}
            className={page === el ? "Pagination-page active" : "Pagination-page"}
            key={el}
          >
            {el}
          </span>
        ))}
      </div>
    );
};

export default Pagination;