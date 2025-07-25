function AnnouncementsList({ user }) {
    return (
        <div>
            <h1>Announcements List</h1>
            <p>Welcome, {user ? user.name : 'Guest'}</p>
        </div>
    );
}

export default AnnouncementsList;
