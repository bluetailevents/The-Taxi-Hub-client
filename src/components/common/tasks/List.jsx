import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function List() {
    const coordinates = useSelector(state => state.coordinates.coordinates); // Get coordinates from Redux state
    const selectedSection = useSelector(state => state.coordinates.section); // Get selected section from Redux state
    const selectedSubsection = useSelector(state => state.coordinates.subsection); // Get selected subsection from Redux state
    const [categories, setCategories] = useState({});
    console.log('Coordinates in Practice Quiz:', coordinates);

    useEffect(() => {
        if (selectedSection && selectedSubsection && coordinates && coordinates[0].features) {
            const matchingFeatures = coordinates[0].features.filter(coordinate => 
                coordinate.properties.Section === selectedSection && 
                coordinate.properties.Subsection === selectedSubsection
            );
            const categories = matchingFeatures.reduce((acc, feature) => {
                const category = feature.properties.Category;
                const street = feature.properties.Street;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(street);
                return acc;
            }, {});
            setCategories(categories);
        }
    }, [selectedSection, selectedSubsection, coordinates]);
    

    return (
        <div>
        <div>
            Selected Section: {selectedSection}
        </div>
        <div>
            Selected Subsection: {selectedSubsection}
        </div>
        {Object.entries(categories).map(([category, streets], index) => (
            <div key={index}>
                <h2>{category}</h2>
                {streets.map((street, index) => (
                    <p key={index}>Street: {street}</p>
                ))}
            </div>
        ))}
        </div>
    );
}

export default List;
