import axios from 'axios';

const API_URL = `${process.env.REACT_APP_SERVER}/api/postcodes/`;

const getPostcode = async (postcode) => {
    const response = await axios.get(API_URL + postcode);
    
    return response.data;
    }

const postcodeService = {
    getPostcode,
};

export default postcodeService;