const prodURL = `https://bex-jobs-api.onrender.com/api/v1`;
const devURL = `http://localhost:5000/api/v1`;
export const BASE_URL = devURL;

export interface CustomAPIError extends Error {
  info: Record<string, unknown>;
  status: number;
}
