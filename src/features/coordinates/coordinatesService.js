
// coordinatesService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER;

const getSections = async () => {
  const response = await axios.get(`${API_URL}/api/geojson/sections`);
  return response.data;
};

const getSubsections = async (section) => {
  const response = await axios.get(`${API_URL}/api/geojson/sections/subsections`);
  return response.data;
};

const getCoordinates = async () => {
  const response = await axios.get(`${API_URL}/api/geojson/`);
  if (response.status === 200) {
      return response.data; // This should be the GeoJSON data
  } else {
      throw new Error('Failed to fetch coordinates');
  }
};



const coordinatesService = {
  getSections,
  getSubsections,
  getCoordinates
};

export default coordinatesService;