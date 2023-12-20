import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';


function List() {
    const coordinates = useSelector(state => state.coordinates.coordinates); // Get coordinates from Redux state
    const dispatch = useDispatch();

    useEffect(() => {
        if(!coordinates || coordinates.length === 0) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);


    return (
        <div>
            <h1>List</h1>
            <ul>
                {coordinates && coordinates.length > 0 ? coordinates.map(coordinate => (
                    <li key={coordinate._id}>{coordinate.properties.Street}</li>
                )) : <div>Loading...</div>}
            </ul>

        </div>
    );
}

export default List;
