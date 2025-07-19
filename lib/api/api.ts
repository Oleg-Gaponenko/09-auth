import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const serverInstance = axios.create({
  baseURL: process.env.API_URL || 'https://notehub-api.goit.study',
  withCredentials: true,
});

export function handleError(error: unknown, errorMessage: string): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`${errorMessage}: ${message}`);
  } else {
    throw new Error(errorMessage);
  }
}
