import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ResultsModal from '../ResultsModal';
import { useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../../features/coordinates/coordinatesSlice';
import '../../../css/PracticeQuiz.css';
import LeafletMap from '../animations/LeafletMap';

function MapsQuiz() {
    const { coordinates } = useSelector(state => state.coordinates);
    const {selectedSection, selectedSubsection} = useSelector(state => state.quizResults);
    
    const [quizCategories, setQuizCategories] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswersByCategory, setUserAnswersByCategory] = useState({});
    const [allUserAnswers, setAllUserAnswers] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentCoordinate, setCurrentCoordinate] = useState(null);
    const dispatch = useDispatch();
    const [currentCoordinates, setCurrentCoordinates] = useState([]);

    

    

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
        if (matchingFeatures.length > 0 && quizQuestions.length > 0 && quizQuestions[currentQuestionIndex]) {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const currentFeatures = matchingFeatures.filter(feature => feature.properties.Category === currentQuestion.category);
            const currentCoordinates = currentFeatures.map(feature => [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
            setCurrentCoordinates(currentCoordinates); // set all coordinates for the current category
        }
    }, [matchingFeatures, quizQuestions, currentQuestionIndex]);

    useEffect(() => {
        if(!coordinates || coordinates.length === 0) {
            dispatch(fetchCoordinates());
        }
    }, [dispatch, coordinates]);

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
                    category: category,
                    questionText: `Which streets are in ${category}?`,
                    options: options,
                    correctOptions: correctStreets
                };
            });
            setQuizQuestions(questions);
        }
    }, [matchingFeatures]);

    useEffect(() => {
        if (matchingFeatures.length > 0 && quizQuestions.length > 0 && quizQuestions[currentQuestionIndex]) {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const currentFeatures = matchingFeatures.filter(feature => feature.properties.Category === currentQuestion.category);
            const currentCoordinates = currentFeatures.map(feature => [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
            setCurrentCoordinate(currentCoordinates[0]); // or some other logic to select the coordinate
        }
    }, [matchingFeatures, quizQuestions, currentQuestionIndex]);

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
        return Object.keys(quizCategories).reduce((results, category) => {
            const userAnswers = allUserAnswers[category] || [];
            const correctAnswers = quizCategories[category] || [];
            results[category] = { userAnswers, correctAnswers };
            return results;
        }, {});
    }, [allUserAnswers, quizCategories]);
    
    const renderQuiz = () => {
        if (matchingFeatures.length > 0 && quizQuestions.length > 0 && quizQuestions[currentQuestionIndex]) {
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
        } else {
            return null;
        }
    };
    console.log('currentCoordinate', currentCoordinate);

    return (
        <div className='map-quiz-container'>
            <div>
                Selected Section: {selectedSection}
            </div>
            <div>
                Selected Subsection: {selectedSubsection}
            </div>
            {quizQuestions.length > 0 && renderQuiz()}
            <div className='map-container'>
            {currentCoordinates.length > 0 && <LeafletMap coordinates={currentCoordinates} />}
            </div>
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

export default MapsQuiz;
