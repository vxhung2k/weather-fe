import axios from 'axios';

// const baseUrl = process.env.REACT_APP_BASE_URL ?? '';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
console.log(baseUrl, 122);

const axiosInstance = axios.create({
  baseURL: baseUrl ?? '',
});

export default axiosInstance;
