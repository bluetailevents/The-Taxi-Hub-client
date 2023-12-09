import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoordinates, setSection, setSubsection } from '../../features/coordinates/coordinatesSlice';
import { setMethod } from '../../features/sections/sectionSlice';

function Toolbar() {
    const dispatch = useDispatch();
    const coordinates = useSelector(state => state.coordinates);
    const selectedSection = useSelector(state => state.coordinates.section);
    const selectedSubsection = useSelector(state => state.coordinates.subsection);
    const [sections, setSections] = useState([]);
    const [subsections, setSubsections] = useState([]);

    useEffect(() => {
        dispatch(getCoordinates());
    }, [dispatch]);

    useEffect(() => {
        if (coordinates && coordinates.coordinates && coordinates.coordinates[0] && coordinates.coordinates[0].features) {
            const uniqueSections = [...new Set(coordinates.coordinates[0].features.map(feature => feature.properties.Section))];
            setSections(uniqueSections);
        }
    }, [coordinates]);

    useEffect(() => { // New useEffect hook to update subsections when section changes
        if (selectedSection && coordinates && coordinates.coordinates && coordinates.coordinates[0] && coordinates.coordinates[0].features) {
            const uniqueSubsections = [...new Set(coordinates.coordinates[0].features.filter(feature => feature.properties.Section === selectedSection).map(feature => feature.properties.Subsection))];
            setSubsections(uniqueSubsections);
        }
    }, [selectedSection, coordinates]);

    const handleSectionChange = (event) => {
        dispatch(setSection(event.target.value));
        dispatch(setSubsection(''));
    }

    const handleSubsectionChange = (event) => {
        dispatch(setSubsection(event.target.value));
    }

    if (coordinates.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="toolbar">
            <select value={selectedSection || ''} onChange={handleSectionChange}>
                <option value="">Select a section</option>
                {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                ))}
            </select>

            {selectedSection && (
                <select value={selectedSubsection || ''} onChange={handleSubsectionChange}>
                    <option value="">Select a subsection</option>
                    {subsections.map(subsection => ( // Use subsections state to populate dropdown
                        <option key={subsection} value={subsection}>{subsection}</option>
                    ))}
                </select>
            )}
            <section>
                <button onClick={() => dispatch(setMethod('Practice Quiz'))}> Practice Quiz</button>
                <button onClick={() => dispatch(setMethod('List'))}> List</button>
            </section>
        </div>
    );
}

export default Toolbar;
