import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';
import Modal from 'react-modal';
import LeafletMap from '../animations/LeafletMap';
import _ from 'lodash';

function Table({ modalIsOpen, setModalIsOpen }) {
    const dispatch = useDispatch();
    const { coordinates, loading } = useSelector(state => state.coordinates);
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);
    const [allCoordinates, setAllCoordinates] = useState([]);

    useEffect(() => {
        if(!coordinates || coordinates.length === 0) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);

    const matchingFeatures = useMemo(() => {
        return (coordinates && coordinates.length > 0 && coordinates[0]?.features)
            ? coordinates[0].features.filter(feature => 
                feature.properties.Section === selectedSection && 
                feature.properties.Subsection === selectedSubsection)
            : [];
    }, [coordinates, selectedSection, selectedSubsection]);



    const sortedAndGroupedFeatures = useMemo(() => {
        const sortedFeatures = [...matchingFeatures].sort((a, b) => {
            const postcodeA = a.properties.Postcode.split(' ')[0];
            const postcodeB = b.properties.Postcode.split(' ')[0];
            return postcodeA.localeCompare(postcodeB);
        });
        return _.groupBy(sortedFeatures, feature => feature.properties.Category);
    }, [matchingFeatures]);

    const postcodeOverview = useMemo(() => {
        return Object.entries(sortedAndGroupedFeatures).reduce((acc, [area, features]) => {
            const postcodes = features.map(f => f.properties.Postcode.split(' ')[0]);
            acc[area] = [...new Set(postcodes)].join(', ');
            return acc;
        }, {});
    }, [sortedAndGroupedFeatures]);

    const handleOptionClick = () => {
        const allCoords = matchingFeatures.map(feature => ({ 
            area: feature.properties.Category, 
            street: feature.properties.Street, 
            lat: feature.geometry.coordinates[1], 
            lng: feature.geometry.coordinates[0], 
            postcode: feature.properties.Postcode 
        }));
        setAllCoordinates(allCoords);
        setModalIsOpen(true);
    };

    if (loading || !coordinates || coordinates.length === 0) {
        return <div>Loading coordinates...</div>;
    }

    return (
        <div className="coordinates-data">
            <h1>Coordinates Data for {selectedSection}</h1>
            <h1 onClick={handleOptionClick}>{selectedSubsection}</h1>
            {matchingFeatures.length > 0 ? (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Area</th>
                            {[...Array(4)].map((_, index) => (
                                <th key={index}>Street {index + 1}</th>
                            ))}
                            <th>Postcode Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(sortedAndGroupedFeatures).map(([area, features]) => {
                            return (
                                <tr key={area} className="coordinate-row">
                                    <td>{area}</td>
                                    {[...Array(4)].map((_, index) => {
                                        const feature = features[index];
                                        return (
                                            <td key={index}>{feature?.properties.Street || ''}</td>
                                        );
                                    })}
                                    <td>{postcodeOverview[area]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No data available for the selected section and option.</p>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Coordinate Modal"
            >
                <div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                    <LeafletMap coordinates={allCoordinates} />
                </div>
            </Modal>
        </div>
    );
}

export default React.memo(Table);
