import { useParams } from 'react-router-dom';

function AnnouncementDetails({ user }) {
    const { id } = useParams();

    return (
        <div>
            <h1>Announcement Details</h1>
            <p>ID: {id}</p>
            <p>User: {user ? user.name : 'Guest'}</p>
        </div>
    );
}

export default AnnouncementDetails;
