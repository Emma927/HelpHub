function OrganizationRegister({ setUser }) {
    return (
        <div>
            <h1>Organization Register</h1>
            <button onClick={() => setUser({ type: 'organization', name: 'New Org' })}>
                Register
            </button>
        </div>
    );
}

export default OrganizationRegister;
