function UserLogin({ setUser }) {
    return (
        <div>
            <h1>User Login</h1>
            <button onClick={() => setUser({ type: 'user', name: 'Test User' })}>
                Log In
            </button>
        </div>
    );
}

export default UserLogin;
