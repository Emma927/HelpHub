import { Outlet } from "react-router-dom";

function Main() {

    return (
        <main className="d-flex flex-grow-1 justify-content-center pt-2">
            {/*Renderuj inne strony z kontenerem*/}
            <div className="container d-flex justify-content-center mt-5 pt-5 align-items-center">
                <Outlet/>
            </div>
        </main>
    );
}

export default Main;