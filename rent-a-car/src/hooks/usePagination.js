import { useState } from 'react';

const usePagination = (data = [], itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  let itemCount = 0;
  if (data){
    itemCount = data.length
  }

  /**
   * Returns data for the current page
   * @returns {Array}
   */
  const getCurrentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return data.slice(start, end);
  };

  /**
   * Sets the current page
   * @param {number} pageNumber - The current page number
   */
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * The total page count
   * @type {number}
   */
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  return {
    currentPage, getCurrentData, changePage, pageCount,
  };
};

export default usePagination;