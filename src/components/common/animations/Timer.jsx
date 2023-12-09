import React, { useEffect, useState } from "react";

function Timer({ initialTime, onTimeUp, isModalOpen, currentIndex }) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        setTime(initialTime); // Reset the time whenever currentIndex changes
        let timerId;
        if (!isModalOpen) {
            timerId = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 1) {
                        clearInterval(timerId);
                        setTimeout(onTimeUp, 0); // Schedule onTimeUp to be called after render
                        return initialTime; // Reset the time to the initial time
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [initialTime, onTimeUp, isModalOpen, currentIndex]); // Add currentIndex as a dependency

    return <div>Time remaining: {time} seconds</div>;
}


export default Timer;
