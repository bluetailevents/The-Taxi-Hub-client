import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AnimatedProgressBar from '../animations/AnimatedProgressBar';
import AnimatedClock from '../animations/AnimatedClock';
import '../../../css/Overview.css';

function Overview({ quizResults }) {
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);

    // Initialize performanceScores and totalTimes to empty arrays
    const [performanceScores, setPerformanceScores] = useState([]);
    const [totalTimes, setTotalTimes] = useState([]);

    useEffect(() => {
        // Check if section and option are defined
        if (!section || !option) {
            return;
        }

        // Filter the quizResults based on the section and option
        const filteredQuizResults = quizResults.quizResults.filter(quiz => {
            return quiz.quizzes[0].section === section.name && quiz.quizzes[0].subsection === option;
        });

        // Check if filteredQuizResults is not empty
        if (filteredQuizResults.length === 0) {
            return;
        }

        // Sort the filteredQuizResults in descending order of timestamp
        const sortedQuizResults = [...filteredQuizResults].sort((a, b) => b.timestamp - a.timestamp);

        // Calculate performanceScores and totalTimes
        const newPerformanceScores = sortedQuizResults.map(quiz => {
            const correctAnswersCount = quiz.quizzes[0].results[0].correctAnswers.length;
            const incorrectAnswersCount = quiz.quizzes[0].results[0].incorrectAnswers.length;
            return correctAnswersCount / (correctAnswersCount + incorrectAnswersCount) * 100;
        });

        const newTotalTimes = sortedQuizResults.map(quiz => {
            return quiz.quizzes[0].results[0].correctAnswers.reduce((total, resultArray) => total + resultArray[0].timeTaken, 0)
                + quiz.quizzes[0].results[0].incorrectAnswers.reduce((total, resultArray) => total + resultArray[0].timeTaken, 0);
        });

        // Update performanceScores and totalTimes after a delay
        setTimeout(() => {
            setPerformanceScores(newPerformanceScores);
            setTotalTimes(newTotalTimes);
        }, 100); // Adjust delay as needed
    }, [section, option, quizResults]);

    return (
        <div className="overview">
            <h2>Overview</h2>
            {performanceScores.map((performanceScore, index) => (
                <div key={index} className="quiz-result">
                    <div className="performance-score">
                        <div>Quiz {index + 1} Performance Score</div>
                        <AnimatedProgressBar value={performanceScore} />
                    </div>
                    <div className="total-time-taken">
                        <div>Total Time Taken</div>
                        <AnimatedClock seconds={totalTimes[index]} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Overview;
