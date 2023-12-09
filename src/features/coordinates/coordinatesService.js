import axios from 'axios'

const API_URL = `${process.env.REACT_APP_PUBLIC_URL}/api/geojson/`;

// Get coordinates
const getCoordinates = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const coordinatesService = {
    getCoordinates,
}

export default coordinatesService
