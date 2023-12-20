import React, { useEffect, memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubsections } from '../../features/coordinates/coordinatesSlice';
import { setSelectedMethod as setMethod, setSelectedSection, setSelectedSubsection } from '../../features/quizResults/quizResultsSlice';
import '../../css/Toolbar.css';

function Toolbar() {
    const dispatch = useDispatch();
    const { sections, subsections } = useSelector(state => ({
        sections: state.coordinates.sections,
        subsections: state.coordinates.subsections,
    }));
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);
    const [selectedMethod, setSelectedMethod] = useState('Practice Quiz'); // Initialize selectedMethod with a default value
    useEffect(() => {
        dispatch(fetchSubsections());
    }, [dispatch]);
    

    const handleSectionChange = (event) => {
        event.preventDefault();
        const newSection = event.target.value;
        console.log('Section selected:', newSection);
        dispatch(setSelectedSection(newSection)); // Update selected section in quizResults slice
    }
    
    const handleSubsectionChange = (event) => {
        event.preventDefault();
        const newSubsection = event.target.value;
        console.log('Subsection selected:', newSubsection);
        dispatch(setSelectedSubsection(newSubsection)); // Update selected subsection in quizResults slice
    }

    const handleButtonClick = useCallback((method) => (event) => {
        event.preventDefault();
        console.log('Method selected:', method);
        // Only update the state if the selected method is different
        if (method !== selectedMethod) {
            setSelectedMethod(method); // Update selected method locally
            dispatch(setMethod(method)); // Also update selected method in quizResults slice
        }
    }, [dispatch, selectedMethod]); // Add selectedMethod to the dependencies
    

    return (
        <div className="toolbar">
            <select value={selectedSection || ''} onChange={handleSectionChange}>
                <option value="">Select a section</option>
                {sections && sections.length > 0 ? sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                )) : console.log('Sections array is empty or undefined')}
            </select>
            <select value={selectedSubsection || ''} onChange={handleSubsectionChange}>
                <option value="">Select a subsection</option>
                {selectedSection && subsections[selectedSection] ? subsections[selectedSection].map(subsection => (
                    <option key={subsection} value={subsection}>{subsection}</option>
                )) : console.log('Subsections for selected section are not available')}
            </select>

            <section>
            <button type="button" onClick={handleButtonClick('Practice Quiz')}> Practice Quiz</button>
            <button type="button" onClick={handleButtonClick('Flashcards')}> Flashcards</button>
            <button type="button" onClick={handleButtonClick('NoteTaking')}> Note Taking</button>
            <button type="button" onClick={handleButtonClick('Tables')}> Tables</button>
            <button type="button" onClick={handleButtonClick('Maps')}> Maps</button>
        </section>

        </div>
    );
}

export default memo(Toolbar);
