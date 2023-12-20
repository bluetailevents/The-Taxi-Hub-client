import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';

function MnemonicDevices() {
    const dispatch = useDispatch();
    const { coordinates, loading } = useSelector(state => state.coordinates);
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);

    useEffect(() => {
        if(!coordinates || coordinates.length === 0) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);

    // Check if the coordinates are still loading or if they have not been loaded yet
    if (loading || !coordinates) {
        return <div>Loading coordinates...</div>;
    }

    // Ensure that the data is an object before using Object.keys()
    const data = (selectedSection && selectedSubsection && selectedSection[selectedSubsection]) ? selectedSection[selectedSubsection] : {};

    // Now we can safely check if data is not null or undefined before calling Object.keys()
    const locations = data ? Object.keys(data) : [];

    return (
        <div className="mnemonic-devices">
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        <strong>{location}:</strong> {data[location] && data[location].join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MnemonicDevices;
