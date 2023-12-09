import React, { useState } from 'react';
import '../../../css/QuizAnalysis.css';
function QuizAnalysis({ quizResults }) {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(true);

    const handleNext = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setShowCorrectAnswer(true);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setShowCorrectAnswer(true);
    };

    const toggleAnswer = () => {
        setShowCorrectAnswer(prevShowCorrectAnswer => !prevShowCorrectAnswer);
    };

    const handleQuizChange = (event) => {
        const newIndex = Number(event.target.value);
        setCurrentQuizIndex(newIndex);
        setCurrentQuestionIndex(0);
        setShowCorrectAnswer(true);
    };

    if (!quizResults || !quizResults.quizResults || quizResults.quizResults.length === 0) {
        return <div>No quizzes available yet.</div>;
    }

    const currentQuiz = quizResults.quizResults[currentQuizIndex];
    const currentQuizzes = currentQuiz.quizzes || [];
    const currentQuestion = currentQuizzes[0].results && currentQuizzes[0].results[currentQuestionIndex];

    // Flatten the arrays
    const correctAnswers = currentQuestion.correctAnswers.flat();
    const incorrectAnswers = currentQuestion.incorrectAnswers.flat();

    return (
        <div className="quiz-analysis">
            <h2>Quiz Analysis</h2>
            <div className="quiz-select-container">
                <select onChange={handleQuizChange} value={currentQuizIndex} className="quiz-select">
                    {quizResults.quizResults.map((result, index) => (
                        <option key={index} value={index}>{`Quiz ${index + 1}: ${result.quizzes[0].quizType}`}</option>
                    ))}
                </select>
            </div>
            {currentQuestion && (
                <div className={showCorrectAnswer ? "correct-answers" : "incorrect-answers"}>
                    <p>{showCorrectAnswer ? "Correct Answers:" : "Incorrect Answers:"}</p>
                    <table className="answers-table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Selected Answers</th>
                                <th>Correct Answers</th>
                                <th>Time Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(showCorrectAnswer ? correctAnswers : incorrectAnswers).map((answer, index) => (
                                <tr key={index}>
                                    <td>{answer.question}</td>
                                    <td>{answer.selectedAnswers ? answer.selectedAnswers.join(', ') : 'N/A'}</td>
                                    <td>{answer.correctAnswers ? answer.correctAnswers.join(', ') : 'N/A'}</td>
                                    <td>{answer.timeTaken}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
    
            <div className="buttons">
                {currentQuestionIndex > 0 && <button onClick={handlePrevious} className="previous-button">Previous</button>}
                <button onClick={toggleAnswer} className="toggle-answer-button">{showCorrectAnswer ? 'Show Incorrect Answer' : 'Show Correct Answer'}</button>
                {currentQuestion && currentQuestionIndex < currentQuizzes[0].results.length - 1 && <button onClick={handleNext} className="next-button">Next</button>}
            </div>
        </div>
    );
}


export default QuizAnalysis;
