import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const goToNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));
  const goToPrevPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const goToPage = (page) => onPageChange(page);

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

export default PaginationComponent;
