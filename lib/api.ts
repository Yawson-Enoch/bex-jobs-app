const BASE_URL_PROD = `https://bex-jobs-api.onrender.com/api/v1`;
const BASE_URL_DEV = `http://localhost:5000/api/v1`;

export interface CustomAPIError extends Error {
  info: Record<string, unknown>;
  status: number;
}

interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  createdAt: Date;
  updatedAt: Date;
}

type RegisterUser = Omit<User, 'createdAt' | 'updatedAt'>;

type RegisterUserResponse = {
  msg: string;
};

export const registerUser = async (
  user: RegisterUser
): Promise<RegisterUserResponse> => {
  const response = await fetch(`${BASE_URL_DEV}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const responseData: RegisterUserResponse = await response.json();

  if (!response.ok) {
    const error = new Error(
      responseData.msg || 'Failed to register user'
    ) as CustomAPIError;
    error.info = responseData;
    error.status = response.status;
    throw error;
  }

  return responseData;
};
