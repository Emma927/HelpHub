import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { API } from '@/constants.js';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

/**
 * Komponent renderujący przycisk "Usuń konto".
 * Po kliknięciu otwiera modal z potwierdzeniem.
 * Jeśli użytkownik potwierdzi, wysyła żądanie DELETE do API w celu usunięcia konta:
 *  - jeśli operacja się powiedzie, wylogowuje użytkownika i przekierowuje na stronę główną,
 *  - jeśli wystąpi błąd, wyświetla komunikat w modalu.
 */
function DeleteAccountButton() {
  const { user, logout } = useContext(UserContext);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /**
   * Obsługuje usunięcie konta użytkownika:
   * - wysyła żądanie DELETE do API,
   * - w razie sukcesu wylogowuje i przekierowuje do strony głównej,
   * - w razie błędu zapisuje komunikat w stanie,
   * - zawsze zamyka modal po zakończeniu operacji.
   */
  const handleDelete = async () => {
    if (!user) return; // Funkcja kończy działanie, ponieważ nie można usunąć konta, jeśli użytkownik nie jest zalogowany

    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Nie udało się usunąć konta');
      }
      logout();
      navigate('/');
    } catch (err) {
      setError(err.message); // Aktualizuje stan błędu, ustawiając wiadomość z obiektu Error (np. z throw new Error)
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-danger btn--rounded"
        onClick={() => setShowModal(true)}
      >
        <BsTrash size={17} className="text-secondary" />
        <span className="font--resp text-secondary mx-1 btn--text">
          Usuń konto
        </span>
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdzenie usunięcia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy na pewno chcesz usunąć swoje konto? Tej operacji nie można cofnąć.
          {error && <p className="text-danger mt-2">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-secondary"
            onClick={() => setShowModal(false)}
          >
            Anuluj
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Usuń konto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccountButton;
