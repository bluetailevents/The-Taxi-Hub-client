import axios from 'axios'

const API_URL = `${process.env.REACT_APP_PUBLIC_URL}/api/vacancies/`;

// Create new vacancy
const createVacancy = async (vacancyData, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, vacancyData, config)

    return response.data
}

// Get vacancies
const getVacancies = async (token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const vacancyService = {
    createVacancy,
    getVacancies,
}

export default vacancyService
