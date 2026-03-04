import { Alert } from 'react-bootstrap';
import { POSSIBILITIES } from '@/constants.js';

/**
 * News component displaying upcoming platform updates and features.
 * Informs users about planned HelpHub expansions using the POSSIBILITIES list.
 */
function News() {
  return (
    <section className="d-flex justify-content-center align-items-center">
      <Alert variant="success">
        <Alert.Heading>Uwaga: </Alert.Heading>
        <h5>
          Planujemy rozbudowę aplikacji. Trwają prace nad nową wersją HelpHub.
          Wdrożymy nowe opcje, takie jak:
        </h5>
        <ul>
          {POSSIBILITIES.map((possibility, index) => (
            <li key={index}>{possibility}</li>
          ))}
        </ul>
        {/* Horizontal rule to separate content sections */}
        <hr />
        <p className="mb-0">Mamy nadzieję, że będzie Wam się podobać!</p>
      </Alert>
    </section>
  );
}

export default News;
