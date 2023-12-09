// NoteTaking.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function MnemonicDevices() {
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);
    const data = section ? section[option] : {};
    const locations = Object.keys(data);  // Add this line

    return (
        <div className="mnemonic-devices">
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        <strong>{location}:</strong> {data[location].join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MnemonicDevices;
