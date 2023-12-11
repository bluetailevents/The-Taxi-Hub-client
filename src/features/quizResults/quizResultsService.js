import axios from "axios";

const API_URL = `${process.env.REACT_APP_PUBLIC_URL}/api/quiz-results/`;

const getQuizResults = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_URL}${userId}`, config);

        return response.data;
    } catch (error) {
        console.error('Error in getQuizResults:', error);
        throw error; // Re-throw the error so it can be caught and handled upstream
    }
}



const createQuizResults = async (userId, quizResultData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Include the userId in the request body
    const response = await axios.post(`${API_URL}${userId}`, { ...quizResultData, user: userId }, config);
    return response.data;
}


const quizResultsService = {
    getQuizResults,
    createQuizResults,
};

export default quizResultsService;
