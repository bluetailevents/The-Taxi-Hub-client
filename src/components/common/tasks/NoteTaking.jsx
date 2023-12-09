// NoteTaking.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';

function NoteTaking() {
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);
    const data = section ? section[option] : {};
    const locations = Object.keys(data);  // Add this line
    const [notes, setNotes] = useState({});
    const [showInput, setShowInput] = useState({});

    const handleNoteChange = (event, location) => {
        setNotes({
            ...notes,
            [location]: event.target.value
        });
    };

    const toggleInput = (location) => {
        setShowInput({
            ...showInput,
            [location]: !showInput[location]
        });
    };

    return (
        <div className="note-taking">
            {locations.map((location, index) => (
                <div key={index}>
                    <strong>{location}:</strong> {data[location].join(', ')}
                    <FiPlusCircle onClick={() => toggleInput(location)} />
                    {showInput[location] && (
                        <div>
                            <input type="text" value={notes[location] || ''} onChange={(event) => handleNoteChange(event, location)} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteTaking;
