import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';

function NoteTaking() {
    const dispatch = useDispatch();
    const { coordinates } = useSelector(state => state.coordinates);
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);
    const [notes, setNotes] = useState({});
    const [showInput, setShowInput] = useState({});

    useEffect(() => {
        // Dispatch fetchCoordinates if coordinates are not loaded
        if (!coordinates[0]?.features) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);

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

    const handleNoteChange = (event, category) => {
        setNotes({
            ...notes,
            [category]: event.target.value
        });
    };

    const toggleInput = (category) => {
        setShowInput({
            ...showInput,
            [category]: !showInput[category]
        });
    };

    // Check if the coordinates are still loading or if they have not been loaded yet
    if (!coordinates[0]?.features) {
        return <div>Loading coordinates...</div>;
    }

    return (
        <div className="note-taking">
            {Object.entries(streetsByCategory).map(([category, streets], index) => (
                <div key={index}>
                    <strong>{category}:</strong> {streets.join(', ')}
                    <FiPlusCircle onClick={() => toggleInput(category)} />
                    {showInput[category] && (
                        <div>
                            <input type="text" value={notes[category] || ''} onChange={(event) => handleNoteChange(event, category)} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteTaking;
