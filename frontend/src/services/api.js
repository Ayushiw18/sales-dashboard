import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend is running elsewhere
});

export const getStates = () => API.get('/states');
export const getDates = (state) => API.get(`/dates?state=${state}`);
export const getDashboardData = (params) => API.post('/dashboard-data', params);