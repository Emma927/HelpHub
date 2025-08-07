import { Outlet } from 'react-router-dom';

function Hero() {
  return (
    <main className="d-flex flex-grow-1 justify-content-center pt-2">
      {/*Renderuj inne strony z kontenerem*/}
      <div className="container d-flex justify-content-center mt-5 pt-5">
        <Outlet />
      </div>
    </main>
  );
}

export default Hero;
