export const BASE_URL_PROD = `https://bex-jobs-api.onrender.com/api/v1`;
export const BASE_URL_DEV = `http://localhost:5000/api/v1`;

export interface CustomAPIError extends Error {
  info: Record<string, unknown>;
  status: number;
}
