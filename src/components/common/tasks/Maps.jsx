import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';
import LeafletMap from '../animations/LeafletMap';
import ResultsModal from '../ResultsModal';

function Maps() {
    const dispatch = useDispatch();
    const { coordinates } = useSelector(state => state.coordinates);
    const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        dispatch(fetchCoordinates());
    }, [dispatch]);

    const areasWithCoordinates = useMemo(() => {
        const areasMap = {};
        coordinates[0]?.features.forEach(feature => {
            const area = feature.properties.Category;
            const street = feature.properties.Street;
            const coord = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
            if (!areasMap[area]) {
                areasMap[area] = { streets: [], coordinates: [] };
            }
            areasMap[area].streets.push(street);
            areasMap[area].coordinates.push(coord);
        });
        return areasMap;
    }, [coordinates]);

    const areas = useMemo(() => Object.keys(areasWithCoordinates).sort(), [areasWithCoordinates]);

    const currentArea = areas[currentAreaIndex];
    const currentStreets = areasWithCoordinates[currentArea]?.streets || [];
    const currentCoordinates = areasWithCoordinates[currentArea]?.coordinates || [];

    // Generate random incorrect streets
    const allStreets = coordinates[0]?.features.map(feature => feature.properties.Street);
    const incorrectStreets = allStreets
        .filter(street => !currentStreets.includes(street))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    const quizOptions = [...currentStreets, ...incorrectStreets].sort(() => 0.5 - Math.random());

    const handleStreetSelection = (street) => {
        setUserAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers[currentArea] ? [...prevAnswers[currentArea]] : [];
            if (updatedAnswers.includes(street)) {
                return { ...prevAnswers, [currentArea]: updatedAnswers.filter(s => s !== street) };
            } else {
                return { ...prevAnswers, [currentArea]: [...updatedAnswers, street] };
            }
        });
    };

    const handlePreviousArea = () => {
        setCurrentAreaIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleNextArea = () => {
        setCurrentAreaIndex(prevIndex => (prevIndex < areas.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const handleSubmit = () => {
        setQuizCompleted(true);
    };

    return (
        <div className="maps">
            <LeafletMap coordinates={currentCoordinates} />
            <div className="navigation-buttons">
                <button onClick={handlePreviousArea} disabled={currentAreaIndex === 0}>
                    Previous Area
                </button>
                <button onClick={handleNextArea} disabled={currentAreaIndex === areas.length - 1}>
                    Next Area
                </button>
            </div>
            <div className="quiz-options">
                {quizOptions.map((street, index) => (
                    <button
                        key={index}
                        onClick={() => handleStreetSelection(street)}
                        style={userAnswers[currentArea]?.includes(street) ? { backgroundColor: 'green', color: 'white' } : {}}
                    >
                        {street}
                    </button>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit Answers</button>
            {quizCompleted && (
                <ResultsModal
                    finalResults={userAnswers}
                    correctAnswers={areasWithCoordinates}
                    isOpen={quizCompleted}
                    onClose={() => {
                        setCurrentAreaIndex(0);
                        setUserAnswers({});
                        setQuizCompleted(false);
                    }}
                    method="Maps Quiz"
                />
            )}
        </div>
    );
}

export default Maps;
