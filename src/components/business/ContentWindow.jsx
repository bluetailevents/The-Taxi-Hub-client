import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flashcards from '../common/tasks/Flashcards';
import PracticeQuiz from '../common/quizzes/PracticeQuiz';
import QuizzesTimed from '../common/quizzes/QuizzesTimed';
import NoteTaking from '../common/tasks/NoteTaking';
import MnemonicDevices from '../common/tasks/MnemonicDevices';
import Tables from '../common/tasks/Tables';
import Maps from '../common/tasks/Maps';
import List from '../common/tasks/List';
import Analytics from './AnalyticsWindow';
import '../../css/ContentWindow.css';
import { toggleFinish } from '../../features/actions/actionsSlice'; // Import the action

function ContentWindow() {
    const dispatch = useDispatch();
    const method = useSelector(state => state.sections.method);
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);
    const level = useSelector(state => state.sections.level);
    const timer = useSelector(state => state.sections.timer);
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
                <div className='section'>{section ? section.name : ''}</div>
                <div className='option'>{option}</div>
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
