import React from 'react';
import { useSpring, animated } from 'react-spring';

function AnimatedProgressBar({ value }) {
    const props = useSpring({ value, from: { value: 0 }, config: { duration: 5000 } });

    return (
        <div style={{ width: '100%', height: '20px', backgroundColor: '#ccc' }}>
            <animated.div style={{
                width: props.value.to(value => `${value}%`),
                height: '100%',
                backgroundColor: props.value.to(value => {
                    if (value < 50) {
                        return `rgba(${255}, ${255 * value / 50}, 0)`; // transition from red to yellow
                    } else {
                        return `rgba(${255 * (1 - (value - 50) / 50)}, ${255}, 0)`; // transition from yellow to green
                    }
                })
            }} />
        </div>
    );
}

export default AnimatedProgressBar;
