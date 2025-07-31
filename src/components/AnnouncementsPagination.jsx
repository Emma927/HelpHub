import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { FiltersContext } from '@/context/FiltersContext';

function AnnouncementsPagination({ totalPages }) {
  const { currentPage, setCurrentPage } = useContext(FiltersContext);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pageNumbers.push('...');
    }
  }

  return (
    <Pagination className="d-flex justify-content-center mt-5">
      <Pagination.Prev onClick={goToPrevPage} disabled={currentPage === 1} />
      {pageNumbers.map((page, index) => (
        <Pagination.Item
          key={index}
          active={page === currentPage}
          onClick={() => typeof page === 'number' && goToPage(page)}
          disabled={page === '...'}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default AnnouncementsPagination;
