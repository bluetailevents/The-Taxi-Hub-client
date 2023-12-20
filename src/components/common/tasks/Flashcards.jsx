import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';

function Flashcards() {
    const dispatch = useDispatch();
    const { coordinates } = useSelector(state => state.coordinates);
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animation, setAnimation] = useState('');
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        if(!coordinates || coordinates.length === 0) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);

    // Ensure that coordinates[0]?.features is defined and is an array before using .forEach
    const matchingFeatures = useMemo(() => {
        return (coordinates[0]?.features && Array.isArray(coordinates[0]?.features))
            ? coordinates[0].features.filter(feature => 
                feature.properties.Section === selectedSection && 
                feature.properties.Subsection === selectedSubsection)
            : [];
    }, [coordinates, selectedSection, selectedSubsection]);

    const streetsByCategory = useMemo(() => {
        const streetsMap = {};
        matchingFeatures.forEach(feature => {
            const category = feature.properties.Category;
            const street = feature.properties.Street;
            if (!streetsMap[category]) {
                streetsMap[category] = [];
            }
            streetsMap[category].push(street);
        });
        return streetsMap;
    }, [matchingFeatures]);

    const categories = useMemo(() => {
        return Object.keys(streetsByCategory).sort();
    }, [streetsByCategory]);

    const handlePrevious = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsFlipped(false);
            setAnimation('');
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleCheckAnswer = () => {
        // Implement the logic to check the user's answer here
        // For example:
        // if (streetsByCategory[categories[currentCardIndex]].includes(userInput.trim())) {
        //     setAnimation('correct');
        // } else {
        //     setAnimation('incorrect');
        // }
    };

    const handleNext = () => {
        if (currentCardIndex < categories.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
            setAnimation('');
        }
    };

    const isAtBeginning = currentCardIndex === 0;
    const isAtEnd = currentCardIndex === categories.length - 1;

    const currentCategory = categories[currentCardIndex];
    const currentStreets = streetsByCategory[currentCategory];

    return (
        <div className="flashcards">
            <div className={`card ${isFlipped ? 'flipped' : ''} ${animation}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="front">
                    {currentCategory}
                </div>
                <div className="back">
                    {currentStreets && currentStreets.join(', ')}
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
