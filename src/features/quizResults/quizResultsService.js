import axios from 'axios';

const API_URL = `${process.env.REACT_APP_PUBLIC_URL}/api/quiz-results/`;

// Function to get quiz results for a user
const getQuizResults = async (userId, token) => {
const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await axios.get(`${API_URL}${userId}`, config);
return response.data;
};

// Function to create quiz results for a user
const createQuizResults = async (userId, quizResultData, token) => {
const config = {
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await axios.post(`${API_URL}${userId}`, { ...quizResultData, user: userId }, config);
return response.data;
};

const quizResultsService = {
getQuizResults,
createQuizResults,
};

export default quizResultsService;
