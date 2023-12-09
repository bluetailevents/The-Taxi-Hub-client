import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function PerformanceOverTime({ quizResults }) {
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);

    console.log('section:', section); // Log the section
    console.log('option:', option); // Log the option

    // Check if section and option are defined
    if (!section || !option) {
        return <div>Please select a section and an option.</div>;
    }

    // Filter the quizResults based on the section and option
    const filteredQuizResults = quizResults.quizResults.filter(quiz => {
        console.log('quiz.quizzes section:', quiz.quizzes[0].section); // Log quiz.quizzes[0].section
        console.log('quiz.quizzes subsection:', quiz.quizzes[0].subsection); // Log quiz.quizzes[0].subsection
        return quiz.quizzes[0].section === section.name && quiz.quizzes[0].subsection === option;
    });

    console.log('filteredQuizResults:', filteredQuizResults); // Log the filteredQuizResults

    // Check if filteredQuizResults is not empty
    if (filteredQuizResults.length === 0) {
        return <div>No quizzes available for the selected section and option.</div>;
    }

    // Prepare the data for the component
    const labels = []; // For the quiz dates
    const dataCorrectPercentage = []; // For the percentage of correct answers
    const dataTotalTime = []; // For the total time taken for each quiz

    filteredQuizResults.forEach((quiz, index) => {
        labels.push(`Quiz ${index + 1}`); // Use the quiz number as the label
        const correctAnswersCount = quiz.quizzes[0].results[0].correctAnswers.length;
        const incorrectAnswersCount = quiz.quizzes[0].results[0].incorrectAnswers.length;
        const performanceScore = correctAnswersCount / (correctAnswersCount + incorrectAnswersCount) * 100;
        dataCorrectPercentage.push(performanceScore); // Add the performance score to the data array

        const totalTime = quiz.quizzes[0].results[0].correctAnswers.reduce((total, resultArray) => total + resultArray[0].timeTaken, 0)
            + quiz.quizzes[0].results[0].incorrectAnswers.reduce((total, resultArray) => total + resultArray[0].timeTaken, 0);
        dataTotalTime.push(totalTime); // Add the total time to the data array
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Percentage of Correct Answers',
                data: dataCorrectPercentage,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Total Time Taken',
                data: dataTotalTime,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <div>
            <h2>Performance Over Time</h2>
            <Line data={chartData} />
        </div>
    );
}

export default PerformanceOverTime;
