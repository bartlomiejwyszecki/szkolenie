import axios, { AxiosInstance } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const httpService = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, data);
    return response.data;
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
  },
}; 