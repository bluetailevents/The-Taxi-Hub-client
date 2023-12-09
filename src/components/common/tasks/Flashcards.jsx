// Flashcards.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Flashcards() {
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);
    const data = section ? section[option] : {};
    const locations = Object.keys(data);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const currentLocation = locations[currentCardIndex];
    const [isFlipped, setIsFlipped] = useState(false);
    const [animation, setAnimation] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleCheckAnswer = () => {
        if (userInput.toLowerCase() === currentLocation.toLowerCase()) {
            alert('Correct!');
        } else {
            alert(`Incorrect. The correct answer is ${currentLocation}.`);
        }
        setUserInput(''); // Clear the input box
    }

    const handleNext = () => {
        setIsFlipped(false);
        setAnimation('fall');
        setCurrentCardIndex((currentCardIndex + 1) % locations.length);
    };
 
    const handlePrevious = () => {
        setIsFlipped(false);
        setAnimation('rise');
        setCurrentCardIndex((currentCardIndex - 1 + locations.length) % locations.length);
    };

    const isAtBeginning = currentCardIndex === 0;
    const isAtEnd = currentCardIndex === locations.length - 1;

    return (
        <div className="flashcards">
        <div className={`card ${isFlipped ? 'flipped' : ''} ${animation}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="front">
            {data[currentLocation].join(', ')}
            </div>
            <div className="back">
            {currentLocation}
            </div>
        </div>
        <div className="card-navigation">
            <button onClick={handlePrevious} disabled={isAtBeginning}>
            Previous
            </button>
            <div className="answer-input">
                <input type="text" value={userInput} onChange={handleInputChange} placeholder="Enter your answer here" />
                <button onClick={handleCheckAnswer}>Check Answer</button>
            </div>
            <button onClick={handleNext} disabled={isAtEnd}>
            Next
            </button>
        </div>
        </div>
    );
}

export default Flashcards;
