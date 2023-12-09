import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Create an animated version of CircularProgressbar
const AnimatedCircularProgressbar = animated(CircularProgressbar);

function AnimatedClock({ seconds }) {
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const props = useSpring({ value: currentSeconds, from: { value: 0 }, config: { duration: 5000 } });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSeconds(prevSeconds => {
                if (prevSeconds < seconds) {
                    return prevSeconds + 1;
                } else {
                    clearInterval(interval);
                    return prevSeconds;
                }
            });
        }, (5000 / seconds));

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <animated.div style={{ fontSize: '2rem' }}>
            <AnimatedCircularProgressbar
                value={props.value}
                maxValue={seconds}
                text={props.value.to(value => {
                    const minutes = Math.floor(value / 60);
                    const remainingSeconds = Math.floor(value % 60);
                    return `${minutes.toFixed(0)}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
                })}
                styles={buildStyles({
                    rotation: 0.5,
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: props.value.to(value => `rgba(${255 * (1 - value / seconds)}, ${255 * value / seconds}, 0)`),
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            />
        </animated.div>
    );
}

export default AnimatedClock;
