// In Quiz.js
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ResultsModal from '../ResultsModal';
import '../../../css/PracticeQuiz.css';

function Quiz() {
    const { coordinates, section: selectedSection, subsection: selectedSubsection } = useSelector(state => state.coordinates);
    
    const [quizCategories, setQuizCategories] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswersByCategory, setUserAnswersByCategory] = useState({});
    const [allUserAnswers, setAllUserAnswers] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const handleShowHintClick = () => {
        setShowHint(!showHint);
    };

    const matchingFeatures = useMemo(() => {
        return coordinates[0]?.features?.filter(coordinate => 
            coordinate.properties.Section === selectedSection && 
            coordinate.properties.Subsection === selectedSubsection
        );
    }, [coordinates, selectedSection, selectedSubsection]);

    useEffect(() => {
        if (matchingFeatures && matchingFeatures.length > 0) {
            const categoriesMap = matchingFeatures.reduce((acc, feature) => {
                const category = feature.properties.Category;
                const street = feature.properties.Street;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(street);
                return acc;
            }, {});
            setQuizCategories(categoriesMap);

            const questions = Object.entries(categoriesMap).map(([category, streets]) => {
                const correctStreets = streets;
                const falseStreets = [];
                Object.entries(categoriesMap).forEach(([otherCategory, otherStreets]) => {
                    if (otherCategory !== category) {
                        falseStreets.push(...otherStreets);
                    }
                });
                let uniqueFalseStreets = [...new Set(falseStreets)];
                const options = [...correctStreets, ...uniqueFalseStreets.sort(() => 0.5 - Math.random()).slice(0, 4)];
                options.sort(() => 0.5 - Math.random());
                return {
                    category: category, // Add this line
                    questionText: `Which streets are in ${category}?`,
                    options: options,
                    correctOptions: correctStreets
                };
            });
            setQuizQuestions(questions);
        }
    }, [matchingFeatures]);

    const handleOptionClick = (category, street) => {
        setUserAnswersByCategory(prevUserAnswers => {
            let updatedUserAnswers = prevUserAnswers[category] ? [...prevUserAnswers[category]] : [];
            if (updatedUserAnswers.includes(street)) {
                updatedUserAnswers = updatedUserAnswers.filter(item => item !== street);
            } else {
                updatedUserAnswers.push(street);
            }
    
            if (quizQuestions[currentQuestionIndex].correctOptions.length === updatedUserAnswers.length) {
                setUserAnswersByCategory({});
                setShowHint(false);
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    setQuizCompleted(true);
                }
            }
    
            return { ...prevUserAnswers, [category]: updatedUserAnswers };
        });
    
        setAllUserAnswers(prevAllUserAnswers => {
            let updatedAllUserAnswers = prevAllUserAnswers[category] ? [...prevAllUserAnswers[category]] : [];
            if (updatedAllUserAnswers.includes(street)) {
                updatedAllUserAnswers = updatedAllUserAnswers.filter(item => item !== street);
            } else {
                updatedAllUserAnswers.push(street);
            }
            return { ...prevAllUserAnswers, [category]: updatedAllUserAnswers };
        });
    };
    
    

    const finalResults = useMemo(() => {
        console.log('All User Answers:', allUserAnswers);
        return Object.keys(quizCategories).reduce((results, category) => {
            const userAnswers = allUserAnswers[category] || [];
            const correctAnswers = quizCategories[category] || [];
            results[category] = { userAnswers, correctAnswers };
            return results;
        }, {});
    }, [allUserAnswers, quizCategories]);
    

    const renderQuiz = () => {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        return (
            <div key={currentQuestionIndex}>
                <h2>{currentQuestion.questionText}</h2>
                {currentQuestion.options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleOptionClick(currentQuestion.category, option)}
                        style={userAnswersByCategory[currentQuestion.category] && userAnswersByCategory[currentQuestion.category].includes(option) ? {backgroundColor: 'green', color: 'white'} : {}}
                    >
                        {option}
                    </button>
                ))}
            </div>
        );
    };
    

    return (
        <div>
            <div>
                Selected Section: {selectedSection}
            </div>
            <div>
                Selected Subsection: {selectedSubsection}
            </div>
            {quizQuestions.length > 0 && renderQuiz()}
            <section className='tool-box'>
                <button onClick={handleShowHintClick}>Show Hint</button>
                <button>Map</button>
                <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Skip</button>
            </section>
            {showHint && (
                <section className="hint-box">
                    <div>
                        <h3>Hint</h3>
                        {quizQuestions[currentQuestionIndex].correctOptions.map((street, index) => (
                            <p key={index}>{street}</p>
                        ))}
                    </div>
                </section>
            )}
{quizCompleted && (
    <ResultsModal
        finalResults={finalResults}
        correctAnswers={quizCategories}
        isOpen={quizCompleted}
        onClose={() => {
            setCurrentQuestionIndex(0);
            setQuizCompleted(false);
        }}
    />
)}
        </div>
    );
}

export default Quiz;
