import axios from 'axios';
import { handleApiError } from './errorHandling';

export const API_URL = "/proxy";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    window.dispatchEvent(new CustomEvent('show-loading'));
    return config;
  },
  (error) => {
    window.dispatchEvent(new CustomEvent('hide-loading'));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    window.dispatchEvent(new CustomEvent('hide-loading'));
    return response;
  },
  (error) => {
    window.dispatchEvent(new CustomEvent('hide-loading'));

    const handledError = handleApiError(error);

    if (handledError.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = '/account/login';
      return Promise.reject(error);
    }

    console.error('API Error:', handledError);

    return Promise.reject(error);
  }
);


