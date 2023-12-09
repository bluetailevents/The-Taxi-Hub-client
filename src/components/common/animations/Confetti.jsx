import React from 'react';
const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

const ConfettiPiece = () => {
    const style = {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
    };

    return <div className="confetti" style={style}></div>;
};

const Confetti = () => {
    return (
        <div className="confetti-container">
            {[...Array(100)].map((_, index) => (
                <ConfettiPiece key={index} />
            ))}
        </div>
    );
};

export default Confetti;
