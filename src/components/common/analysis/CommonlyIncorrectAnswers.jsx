import React from 'react';
import { useSelector } from 'react-redux';
import'../../../css/CommonIncorrectAnswers.css';

function CommonlyIncorrectAnswers({ quizResults }) {
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
const incorrectAnswers = {}; // For storing the incorrect answers

filteredQuizResults.forEach(quiz => {
    quiz.quizzes[0].results[0].incorrectAnswers.forEach((resultArray) => {
        const result = resultArray[0]; // Access the first object in the resultArray
        const answerKey = result.question; // Use the question as the key
        if (answerKey in incorrectAnswers) {
            incorrectAnswers[answerKey].push(result.selectedAnswers.join(', ')); // Add the selected answers to the incorrectAnswers object
        } else {
            incorrectAnswers[answerKey] = [result.selectedAnswers.join(', ')]; // Initialize the array for the question
        }
    });
});

// Convert the incorrectAnswers object to an array of [question, answers] pairs and sort it by question
const sortedIncorrectAnswers = Object.entries(incorrectAnswers).sort((a, b) => a[0].localeCompare(b[0]));
console.log('section correct ansers', section[option])

return (
    <div>
        <h2>Commonly Incorrect Answers</h2>
        {sortedIncorrectAnswers.map((item, index) => {
            // Get the correct answer for the current area from the section[option] object
            const correctAnswer = section[option][item[0]];
            console.log('Correct answer for', item[0], ':', correctAnswer); // Log the correct answer
            return (
                <div key={item[0]}>
                    <h3>{item[0]}</h3>
                    <p className="correct-answer">{correctAnswer}</p>
                    {item[1].map((answer, index) => (
                        <p key={index} className={answer === correctAnswer ? "correct-answer" : "incorrect-answer"}>{answer}</p>
                    ))}
                </div>
            );
        })}
    </div>
);
    }

export default CommonlyIncorrectAnswers;
