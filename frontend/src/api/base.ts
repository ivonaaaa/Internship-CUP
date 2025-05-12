import axios from "axios";
import { BASE_URL } from "../constants";

export const api = axios.create({
  baseURL: BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const tokenItem = localStorage.getItem("access_token");
    if (tokenItem) {
      config.headers.Authorization = `Bearer ${tokenItem}`;
    }
  } catch {
    console.log("Failed to parse token from localStorage");
  }
  return config;
});

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

api.interceptors.response.use(
  (response) => response.data,
  (error: Error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const apiError = error.response?.data;
      return Promise.reject(apiError?.message || error.message);
    }
    return Promise.reject("Network error");
  }
);
