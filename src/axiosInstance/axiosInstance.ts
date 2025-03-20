import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "https://rickandmortyapi.com/api";

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
