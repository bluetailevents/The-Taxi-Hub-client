import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubsections } from '../../features/coordinates/coordinatesSlice';
import { setSelectedMethod, setSelectedSection, setSelectedSubsection } from '../../features/quizResults/quizResultsSlice';
import '../../css/Toolbar.css';

function Toolbar() {
    const dispatch = useDispatch();
    const { sections, subsections, loading, loaded } = useSelector(state => state.coordinates);
    const { selectedSection, selectedSubsection } = useSelector(state => state.quizResults);

    useEffect(() => {
        if (!loaded) {
            dispatch(fetchSubsections());
        }
    }, [dispatch, loaded]);
    

    const handleSectionChange = (event) => {
        const newSection = event.target.value;
        console.log('Section selected:', newSection);
        dispatch(setSelectedSection(newSection)); // Update selected section in quizResults slice
        dispatch(setSelectedMethod('Practice Quiz')); // Reset method when section changes
        // No need to dispatch fetchSubsections here since all subsections are already fetched
    }

    const handleSubsectionChange = (event) => {
        const newSubsection = event.target.value;
        console.log('Subsection selected:', newSubsection);
        dispatch(setSelectedSubsection(newSubsection)); // Update selected subsection in quizResults slice
        dispatch(setSelectedMethod('Practice Quiz')); // Update method based on the new subsection
    }

    if (loading) {
        console.log('Loading...');
        return <div>Loading...</div>;
    }

    // Rest of your component rendering logic

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
                <button onClick={() => dispatch(setSelectedMethod('Practice Quiz'))}> Practice Quiz</button>
                <button onClick={() => dispatch(setSelectedMethod('List'))}> List</button>
                <button onClick={() => dispatch(setSelectedMethod('Flashcards'))}> Flashcards</button>
                <button onClick={() => dispatch(setSelectedMethod('QuizzesTimed'))}> Quizzes Timed</button>
                <button onClick={() => dispatch(setSelectedMethod('NoteTaking'))}> Note Taking</button>
                <button onClick={() => dispatch(setSelectedMethod('MnemonicDevices'))}> Mnemonic Devices</button>
                <button onClick={() => dispatch(setSelectedMethod('Tables'))}> Tables</button>
                <button onClick={() => dispatch(setSelectedMethod('Maps'))}> Maps</button>
                <button onClick={() => dispatch(setSelectedMethod('Analytics'))}> Analytics</button>
            </section>
        </div>
    );
}

export default memo(Toolbar);
