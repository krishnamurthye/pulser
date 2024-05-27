// utils/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authRoute = "/api/auth/";

export const buildUrl = (route: string, endpoint: string) =>
  `${API_BASE_URL}${route + endpoint}`;
