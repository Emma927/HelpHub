import { Alert } from 'react-bootstrap'

function News() {
    return (
        <Alert variant="success">
            <Alert.Heading>Uwaga: </Alert.Heading>
            <p>
                Planujemy rozbudowę aplikacji. Trwają prace na wersją HelpHub 2.0. Wdrożymy nowe opcje, takie jak
                indywidualne zamieszczenie ogłoszeń przez wszystkich organizatorów zbiórek.
            </p>
            <hr/>
            <p className="mb-0">
                Mamy nadzieję, że będzie Wam się podobać!
            </p>
        </Alert>
    );
}

export default News;