function OrganizationLogin({ setUser }) {
    return (
        <div>
            <h1>Organization Login</h1>
            <button onClick={() => setUser({ type: 'organization', name: 'Test Org' })}>
                Log In
            </button>
        </div>
    );
}

export default OrganizationLogin;
