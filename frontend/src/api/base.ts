import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../constants";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  // const tokenItem = localStorage.getItem("jwt");
  // if (tokenItem) {
  // const token = JSON.parse(tokenItem);
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwLCJlbWFpbCI6Im1hcmtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibWFya29zYWlsb3JtYW4iLCJzdWJzY3JpcHRpb25QbGFuIjoiRlJFRV9UUklBTCIsImlhdCI6MTc0NjYxNjMxMSwiZXhwIjoxNzQ2NzAyNzExfQ.X8-ZVAo3kSO3c5JAvdNRHykTQIV6fyhRTDo0Ku_3gJw`;
  // }
  return config;
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    if (error.response) {
      return Promise.reject(error.response.data.message || error.message);
    }

    return Promise.reject("Network error");
  }
);
