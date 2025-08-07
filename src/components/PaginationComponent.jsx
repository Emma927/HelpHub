import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Jeśli liczba stron jest mniejsza lub równa 1, komponent nie renderuje się, ponieważ paginacja nie jest potrzebna

  // Definiuje funkcję goToNextPage, która zmienia stronę na następną, ale nie przekracza liczby totalPages
  const goToNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));
  // Definiuje funkcję goToPrevPage, która zmienia stronę na poprzednią, ale nie schodzi poniżej strony 1.
  const goToPrevPage = () => onPageChange(Math.max(currentPage - 1, 1));
  // Definiuje funkcję goToPage, która zmienia stronę na określoną przez użytkownika.
  const goToPage = (page) => onPageChange(page);

  const pageNumbers = []; // Inicjalizuje pustą tablicę pageNumbers, która będzie przechowywać numery stron do wyświetlenia
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2) //  Sprawdza, czy numer strony jest pierwszą stroną, ostatnią stroną, lub jest w pobliżu bieżącej strony (w zakresie dwóch stron przed i po)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pageNumbers.push('...');
    }
  }

  return (
    <Pagination className="d-flex justify-content-center mt-5">
      {/*Tworzy przycisk do przechodzenia do poprzedniej strony, który jest wyłączony, jeśli jesteśmy na pierwszej stronie.*/}
      <Pagination.Prev onClick={goToPrevPage} disabled={currentPage === 1} />
      {pageNumbers.map((page, index) => (
        // Tworzy element Pagination.Item dla każdego numeru strony. Ustawia active jeśli jest to bieżąca strona, onClick wywołuje goToPage tylko dla numerów stron, a disabled dla '...'.
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
