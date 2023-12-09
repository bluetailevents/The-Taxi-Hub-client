import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function TimeSpentOnEachQuestion({ quizResults }) {
    const [selectedQuiz, setSelectedQuiz] = useState('all'); // State to keep track of the selected quiz
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

    // Access the selected quiz in the filteredQuizResults array
    const currentQuiz = selectedQuiz === 'all' ? filteredQuizResults : [filteredQuizResults[selectedQuiz]];

    // Prepare the data for the chart
    const labels = []; // For question names
    const data = []; // For time spent on each answer
    const backgroundColors = []; // For background colors of each bar
    const hoverBackgroundColors = []; // For hover background colors of each bar
    const hoverLabels = []; // For hover labels

    currentQuiz.forEach((quiz, quizIndex) => {
        quiz.quizzes[0].results[0].correctAnswers.forEach((resultArray, index) => {
            const result = resultArray[0]; // Access the first object in the resultArray
            console.log(`Q${index + 1}:`, result); // Log each question result
            labels.push(`${result.question} (Quiz ${quizIndex + 1})`); // Use the question name and quiz number as the label
            data.push(result.timeTaken); // Make sure timeTaken exists in each result
            backgroundColors.push('rgba(75,192,192,0.4)'); // Set the background color for correct answers
            hoverBackgroundColors.push('rgba(75,192,192,0.6)'); // Set the hover background color for correct answers
            hoverLabels.push(`Correct Answer: ${result.correctAnswers.join(', ')}\nSelected Answer: ${result.selectedAnswers.join(', ')}\nTime: ${result.timeTaken}`);
        });

        quiz.quizzes[0].results[0].incorrectAnswers.forEach((resultArray, index) => {
            const result = resultArray[0]; // Access the first object in the resultArray
            labels.push(`${result.question} (Quiz ${quizIndex + 1})`); // Use the question name and quiz number as the label
            data.push(result.timeTaken); // Make sure timeTaken exists in each result
            backgroundColors.push('rgba(255,99,132,0.4)'); // Set the background color for incorrect answers
            hoverBackgroundColors.push('rgba(255,99,132,0.6)'); // Set the hover background color for incorrect answers
            hoverLabels.push(`Incorrect Answer: ${result.correctAnswers.join(', ')}\nSelected Answer: ${result.selectedAnswers.join(', ')}\nTime: ${result.timeTaken}`);
        });
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Time Spent on Each Answer',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: hoverBackgroundColors,
                hoverBorderColor: 'rgba(75,192,192,1)',
            }
        ]
    };
    
    const chartOptions = {
        indexAxis: 'x', // Specify 'x' for index-based axis
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return hoverLabels[tooltipItem.index];
                }
            }
        }
    };
    
    return (
        <div>
            <h2>Time Spent On Each Question</h2>
            <select onChange={(e) => setSelectedQuiz(e.target.value)}>
                <option value="all">All Quizzes</option>
                {filteredQuizResults.map((quiz, index) => (
                    <option value={index} key={index}>
                        Quiz {index + 1}
                    </option>
                ))}
            </select>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default TimeSpentOnEachQuestion;
