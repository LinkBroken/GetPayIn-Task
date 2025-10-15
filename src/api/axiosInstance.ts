import axios from 'axios';
import { storage } from '../utils/mmkv';

const API_BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = storage.getString('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (__DEV__) {
      console.log('➡️ Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  error => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('⚠️ Unauthorized, clearing session...');
        storage.delete('token');
      }
      if (__DEV__) {
        console.error(
          '❌ API Error:',
          error.response.status,
          error.response.data,
        );
      }
    } else if (error.request) {
      console.error('❌ Network error: No response from server');
    } else {
      console.error('❌ Axios config error:', error.message);
    }

    return Promise.reject(error);
  },
);
