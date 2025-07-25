import { useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
//import Filters from '@/components/Filters';

const API = 'http://localhost:3002';

function Announcements() {

    const [announcements, setAnnouncements] = useState(null);

    useEffect(() => {
        fetch(`${API}/announcements`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Error: Cannot GET the announcements-list_and_details');
            })
            .then((data) => {
                console.log(data); // Sprawdź strukturę danych
                setAnnouncements(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Wybierz kategorię zbiórki:</h2>

            {!announcements && <span>Trwa ładowanie danych...</span>}
            {announcements && (
                <div className="container">
                    {announcements.map(({
                                            id,
                                            title,
                                            organizationName,
                                            description,
                                            voivodeship,
                                            city,
                                            category: { clothesAndShoes, accessories, urgent },
                                            urgency,
                                            contact,
                                            phone,
                                            email,
                                            website,
                                            address,
                                            datePosted,
                                            deadline,
                                            imageUrl,
                                            imageAlt
                                        }) => (
                        <Card key={id}>
                            <Card.Img variant="top" src="holder.js/100px160"/>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Announcements;