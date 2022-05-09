import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;

export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
