import { useState } from 'react';
import { useUser } from '@/contexts/userContext/useUser';
import { API } from '@/constants.js';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

/**
 * Component that renders a "Delete Account" button and handles account termination.
 * Opens a confirmation modal and sends a DELETE request to the API.
 * On success: logs out the user and redirects to the home page.
 * On failure: displays an error message within the modal.
 */
function DeleteAccountButton() {
  const { user, logout } = useUser();
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handles the asynchronous user account deletion process.
  const handleDelete = async () => {
    if (!user) return; // Guard clause - ensure user is authenticated

    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Nie udało się usunąć konta');
      }
      // Cleanup local session and redirect on success
      logout();
      navigate('/');
    } catch (err) {
      // Update error state with the message from the caught error
      setError(err.message);
    } finally {
      // Always close the modal after the operation completes
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
