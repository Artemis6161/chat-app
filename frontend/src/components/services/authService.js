import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (name, email, password) => {
  return axios.post(API_URL + 'register', { name, email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const getProfile = (token) => {
  return axios.get(API_URL + 'profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateProfile = (token, data) => {
  return axios.put(API_URL + 'profile', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { register, login, getProfile, updateProfile };
