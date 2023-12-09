import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Confetti from '../common/animations/Confetti';

const ResultsModal = ({ isOpen, onClose, finalResults }) => {
    const [showCorrect, setShowCorrect] = useState(false);
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    console.log('finalResults', finalResults); 

    useEffect(() => {
        if (!finalResults) {
            return;
        }

        const correctAnswersCount = Object.keys(finalResults).reduce((count, category) => {
            const { userAnswers, correctAnswers } = finalResults[category];
            if (Array.isArray(userAnswers) && Array.isArray(correctAnswers)) {
                const sortedUserAnswers = [...userAnswers].sort();
                const sortedCorrectAnswers = [...correctAnswers].sort();
                const isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);
                return count + (isCorrect ? 1 : 0);
            }
            return count;
        }, 0);

        const newCorrectPercentage = (correctAnswersCount / Object.keys(finalResults).length) * 100;
        setCorrectPercentage(newCorrectPercentage);

        if (newCorrectPercentage === 100) {
            setShowConfetti(true);
        }
    }, [finalResults]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Quiz Results Modal"
            className="quiz-modal"
        >
            <div className="modal-content">
                <h2 className="modal-title">Quiz Results</h2>
                <p>Correct Answers: {correctPercentage.toFixed(2)}%</p>
                {showConfetti && <Confetti />}
                <button onClick={() => setShowCorrect(!showCorrect)}>
                    {showCorrect ? 'Hide Correct Answers' : 'Show Correct Answers'}
                </button>
                {showCorrect && Object.keys(finalResults).map((category, index) => {
                    const { userAnswers, correctAnswers } = finalResults[category];
                    if (Array.isArray(userAnswers) && Array.isArray(correctAnswers)) {
                        const sortedUserAnswers = [...userAnswers].sort();
                        const sortedCorrectAnswers = [...correctAnswers].sort();
                        const isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);
    
                        if (isCorrect) {
                            return (
                                <div key={index}>
                                    <h3>Question: {category}</h3>
                                    <p>Correct Answers: {sortedCorrectAnswers.join(', ')}</p>
                                </div>
                            );
                        }
                        return null;
                    }
                    return null; // Added to handle cases where the condition is not met
                })}
                <button onClick={() => setShowIncorrect(!showIncorrect)}>
                    {showIncorrect ? 'Hide Incorrect Answers' : 'Show Incorrect Answers'}
                </button>
                {showIncorrect && Object.keys(finalResults).map((category, index) => {
                    const { userAnswers, correctAnswers } = finalResults[category];
                    if (Array.isArray(userAnswers) && Array.isArray(correctAnswers)) {
                        const sortedUserAnswers = [...userAnswers].sort();
                        const sortedCorrectAnswers = [...correctAnswers].sort();
                        const isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);
    
                        if (!isCorrect) {
                            return (
                                <div key={index}>
                                    <h3>Question: {category}</h3>
                                    <p>Correct Answers: {sortedCorrectAnswers.join(', ')}</p>
                                    <p>User Answers: {sortedUserAnswers.join(', ')}</p>
                                </div>
                            );
                        }
                        return null;
                    }
                    return null; // Added to handle cases where the condition is not met
                })}
                <button onClick={onClose} className="modal-close-button">
                    Close
                </button>
            </div>
        </Modal>
    );
    
};

export default ResultsModal;
