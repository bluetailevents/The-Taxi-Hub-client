import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, fetchSubsections, setMethod } from '../../features/coordinates/coordinatesSlice';

function Toolbar() {
    const dispatch = useDispatch();
    const { sections, subsections, loading } = useSelector(state => state.coordinates);
    const selectedSection = useSelector(state => state.coordinates.section);
    const selectedSubsection = useSelector(state => state.coordinates.subsection);

    useEffect(() => {
        dispatch(fetchSections());
    }, [dispatch]);

    useEffect(() => {
        if (selectedSection) {
            dispatch(fetchSubsections(selectedSection));
        }
    }, [selectedSection, dispatch]);

    const handleSectionChange = (event) => {
        dispatch(setMethod('')); // Reset method when section changes
        dispatch(fetchSubsections(event.target.value));
    }

    const handleSubsectionChange = (event) => {
        dispatch(setMethod(event.target.value));
    }

    if (loading) {
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
                    {subsections.map(subsection => (
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
