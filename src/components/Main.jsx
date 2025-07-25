import { Outlet } from "react-router-dom";

function Main() {

    return (
        <main className="d-flex flex-grow-1 justify-content-center w-100 pt-2">
            {/*Renderuj inne strony z kontenerem*/}
            <div className="container d-flex justify-content-center mt-5 pt-5 align-items-center w-100">
                <Outlet/>
            </div>
        </main>
    );
}

export default Main;