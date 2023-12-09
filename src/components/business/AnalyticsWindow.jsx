import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuizResults } from '../../features/quizResults/quizResultsSlice.js';
import PerformanceOverTime from '../common/analysis/PerformanceOverTime.jsx';
import CommonlyIncorrectAnswers from '../common/analysis/CommonlyIncorrectAnswers.jsx';
import TimeSpentOnEachQuestion from '../common/analysis/TimeSpentOnEachQuestion.jsx';
import QuizAnalysis from '../common/analysis/QuizAnalysis.jsx';
import Overview from '../common/analysis/Overview.jsx';

function AnalyticsComponent() {
    const dispatch = useDispatch();
    const quizResults = useSelector(state => state.quizResults);
    const state = useSelector(state => state);
    const [analysisType, setAnalysisType] = useState('overview');

    useEffect(() => {
        dispatch(getQuizResults(state.auth.user._id));
    }, [dispatch, state.auth.user._id]);

    useEffect(() => {
    }, [quizResults]);

    const handleAnalysisTypeChange = (type) => {
        setAnalysisType(type);
    };

    return (
        <div>
            <h1>Quiz Analytics</h1>
            <div className="dashboard">
                <button onClick={() => handleAnalysisTypeChange('overview')}>Overview</button>
                <button onClick={() => handleAnalysisTypeChange('quizAnalysis')}>Single Quiz Analysis</button>
                <button onClick={() => handleAnalysisTypeChange('performanceOverTime')}>Performance Over Time</button>
                <button onClick={() => handleAnalysisTypeChange('commonlyIncorrectAnswers')}>Commonly Incorrect Answers</button>
                <button onClick={() => handleAnalysisTypeChange('timeSpentOnEachQuestion')}>Time Spent On Each Question</button>
            </div>
            {analysisType === 'overview' && <Overview quizResults={quizResults} />}
            {analysisType === 'quizAnalysis' && <QuizAnalysis quizResults={quizResults} />}
            {analysisType === 'performanceOverTime' && <PerformanceOverTime quizResults={quizResults} />}
            {analysisType === 'commonlyIncorrectAnswers' && <CommonlyIncorrectAnswers quizResults={quizResults} />}
            {analysisType === 'timeSpentOnEachQuestion' && <TimeSpentOnEachQuestion quizResults={quizResults} />}
        </div>
    );
}

export default AnalyticsComponent;
