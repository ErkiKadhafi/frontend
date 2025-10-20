import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
});

export const axiosWithAuth = (accessToken: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const axiosWithAuthDownload = (accessToken: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseType: "blob",
  });
