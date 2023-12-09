import React from 'react'

function AnswerButton({ answer, selectedAnswer, onSelect }) {
    const isSelected = answer === selectedAnswer;
    const handleClick = () => {
        onSelect(answer);
    };

    return (
        <button 
            onClick={handleClick} 
            className="quiz-answer"
            style={{backgroundColor: isSelected ? 'blue' : 'grey'}}
        >
            {answer}
        </button>
    );
}


export default AnswerButton