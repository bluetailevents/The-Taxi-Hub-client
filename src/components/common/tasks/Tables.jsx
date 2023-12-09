// Maps.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoordinates } from '../../../features/coordinates/coordinatesSlice';
import Modal from 'react-modal';
import LeafletMap from '../animations/LeafletMap';
import _ from 'lodash';

function Table({ modalIsOpen, setModalIsOpen }) {
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState([]);
    var [allCoordinates, setAllCoordinate] = useState([]);
    useEffect(() => {
        dispatch(getCoordinates());
    }, [dispatch]);

    const coordinatesData = useSelector(state => state.coordinates);
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);

    let filteredData = [];
    if (coordinatesData && coordinatesData.coordinates['654ba3a6f3e34b062d299d40'] && coordinatesData.coordinates['654ba3a6f3e34b062d299d40'][section.name] && coordinatesData.coordinates['654ba3a6f3e34b062d299d40'][section.name][option]) {
        filteredData = coordinatesData.coordinates['654ba3a6f3e34b062d299d40'][section.name][option];
    }

    const groupedData = _.groupBy(filteredData, 'Area');
    const handleOptionClick = () => {
        // Logic for when the option is clicked
        // Loop through all areas and add them to the coordinates
        const allCoordinates = Object.keys(groupedData).flatMap(area => groupedData[area].map(coordinate => ({ 
            area: coordinate.Area, 
            street: coordinate.Street, 
            lat: coordinate.Latitude, 
            lng: coordinate.Longitude, 
            postcode: coordinate.Postcode 
        })));
        setCoordinates(allCoordinates);
        setModalIsOpen(true);
    };
    
    const handleAreaClick = (area) => {
        // Logic for when the area is clicked
        // Loop through all streets and add the streets to the coordinates
        allCoordinates = groupedData[area].map(coordinate => ({
            area: coordinate.Area,
            street: coordinate.Street,
            lat: coordinate.Latitude,
            lng: coordinate.Longitude,
            postcode: coordinate.Postcode
        }));
        setCoordinates(allCoordinates);
        setAllCoordinate(allCoordinates);
        setModalIsOpen(true);
    };



    return (
        <div className="coordinates-data">
            <h1>Coordinates Data for {section.name}</h1>
            <h1 onClick={handleOptionClick}>{option}</h1>
            {filteredData.length > 0 ? (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Street</th>
                            <th>Postcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedData).map((area, index) => (
                            <tr key={index} className="coordinate-row">
                                <td onClick={() => handleAreaClick(area)}>
                                    {area}
                                </td>
                                <td>{groupedData[area][0].Street}</td>
                                <td>{groupedData[area][0].Postcode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No data available for the selected section and option.</p>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Coordinate Modal"
            >
                <div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                    <LeafletMap coordinates={coordinates} allCoordinates={allCoordinates} />
                </div>
            </Modal>
        </div>
    );
}

export default React.memo(Table);