import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center fs-2 h-100 w-100">
            <div className="container flex-column d-flex align-items-center justify-content-center">

                        <DotLottieReact
                            src="https://lottie.host/89a1435f-e29a-46bf-a5d6-e9c544b45f9b/HYwm5IxjnD.lottie"
                            //loop
                            //autoplay
                            className="not-found"
                        />
                <div className="text-center mb-3">
                    <a href="/">Wracaj do nas!</a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;