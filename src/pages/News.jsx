import { Alert } from 'react-bootstrap';
import { possibilities } from '@/constans.js';

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
          {possibilities.map((possibility, index) => (
            <li key={index}>{possibility}</li>
          ))}
        </ul>
        {/*<hr /> to element HTML, który reprezentuje poziomą linię (ang. horizontal rule) używaną do wizualnego oddzielenia sekcji treści.*/}
        <hr />
        <p className="mb-0">Mamy nadzieję, że będzie Wam się podobać!</p>
      </Alert>
    </section>
  );
}

export default News;
