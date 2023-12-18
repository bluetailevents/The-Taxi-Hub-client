import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flashcards from '../components/common/tasks/Flashcards';
import PracticeQuiz from '../components/common/quizzes/PracticeQuiz';
import QuizzesTimed from '../components/common/quizzes/QuizzesTimed';
import NoteTaking from '../components/common/tasks/NoteTaking';
import MnemonicDevices from '../components/common/tasks/MnemonicDevices';
import Tables from '../components/common/tasks/Tables';
import Maps from '../components/common/tasks/ViewMaps';
import List from '../components/common/tasks/List';
import Analytics from './AnalyticsWindow';
import '../css/ContentWindow.css';
import { toggleFinish } from '../features/actions/actionsSlice'; // Import the action

function ContentWindow() {
    const dispatch = useDispatch();
    // Make sure to access the correct state slices for method, section, and subsection
    const method = useSelector(state => state.quizResults.selectedMethod);
    const section = useSelector(state => state.quizResults.selectedSection);
    const subsection = useSelector(state => state.quizResults.selectedSubsection);
    const level = useSelector(state => state.coordinates.level);
    const timer = useSelector(state => state.coordinates.timer);
    const [start, setStart] = useState(false);

    const handleFinish = () => {
        setStart(false);
        dispatch(toggleFinish()); // Dispatch the action here
    };

    const handleStart = () => {
        setStart(true);
    }

    return (
        <div className='content-window'>
            <div className={start ? 'hide' : 'show'}>
                <div className='method'>{method}</div>
                <div className='level'>{level}</div>
                <div className='timer'>{timer}</div>
                {/* Display the section value directly if it's a string */}
                {/* Display the section and subsection values */}
                {section && <div className='section'>{section}</div>}
                {subsection && <div className='subsection'>{subsection}</div>}
                {method && <div className='method'>{method}</div>}
                <button onClick={handleStart}>Start</button>
            </div>
            <div className={start ? 'show' : 'hide'}>
                {method === 'Flashcards' && <Flashcards />}
                {method === 'Practice Quiz' && <PracticeQuiz />}
                {method === 'QuizzesTimed' && <QuizzesTimed />}
                {method === 'NoteTaking' && <NoteTaking />}
                {method === 'MnemonicDevices' && <MnemonicDevices />}
                {method === 'Tables' && <Tables />}
                {method === 'Maps' && <Maps />}
                {method === 'Analytics' && <Analytics />}
                {method === 'List' && <List />}
                <button onClick={handleFinish}>Finish</button>
            </div>
        </div>
    );
}

export default ContentWindow;
