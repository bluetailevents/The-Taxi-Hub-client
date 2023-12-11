import axios from 'axios';

const API_URL = `${process.env.REACT_APP_PUBLIC_URL}/api/business/`;

const createBusiness = async (businessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, businessData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchBusinessData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateBusiness = async (businessId, businessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      API_URL + businessId,
      businessData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBusiness = async (businessId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(API_URL + businessId, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const businessService = {
  createBusiness,
  fetchBusinessData,
  updateBusiness,
  deleteBusiness,
};

export default businessService;
