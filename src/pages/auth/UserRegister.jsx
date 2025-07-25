function UserRegister({ setUser }) {
    return (
        <div>
            <h1>User Register</h1>
            <button onClick={() => setUser({ type: 'user', name: 'New User' })}>
                Register
            </button>
        </div>
    );
}

export default UserRegister;
