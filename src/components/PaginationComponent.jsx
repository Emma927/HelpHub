import { Pagination } from 'react-bootstrap';

/**
 * Komponent `PaginationComponent`
 * - Wyświetla paginację dla listy ogłoszeń.
 * - Otrzymuje propsy:
 *    - `currentPage` – bieżąca strona,
 *    - `totalPages` – liczba wszystkich stron,
 *    - `onPageChange` – callback do zmiany strony.
 * - Obsługuje:
 *    - Przejście do poprzedniej/następnej strony,
 *    - Kliknięcie konkretnego numeru strony,
 *    - Wyświetlanie skróconych zakresów z '...' dla dużej liczby stron.
 * - Nie renderuje się, jeśli `totalPages <= 1`.
 */
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

  /** Ważne: Przeglądarka zarządza fokusem klawiatury według swojej logiki, która zazwyczaj opiera się na kolejności elementów w DOM i ich interaktywności. Fokus przeskakuje do następnego dostępnego elementu, który może przyjąć fokus (czyli jest interaktywny i nie ma atrybutu disabled).
   * - Kliknięty numer strony staje się active, ale fokus może naturalnie przeskoczyć na inny dostępny element (np. o 1 lub 2 numery dalej), w zależności od kolejności w DOM i stanu dostępności, który zna tylko przeglądarka.
   *  - Elementy '…' są nieklikalne i nie przyjmują fokusu, więc przeglądarka pomija go przy obsłudze klawiatury
   */

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
