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

type LoginUser = Pick<User, 'email' | 'password'>;

type LoginUserResponse = {
  msg: string;
  token: string;
};

export const registerUser = async (
  registerData: RegisterUser
): Promise<RegisterUserResponse> => {
  const response = await fetch(`${BASE_URL_DEV}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  const responseData: RegisterUserResponse = await response.json();

  if (!response.ok) {
    const error = new Error(
      responseData.msg || 'Failed to register'
    ) as CustomAPIError;
    error.info = responseData;
    error.status = response.status;
    throw error;
  }

  return responseData;
};

export const loginUser = async (
  loginData: LoginUser
): Promise<LoginUserResponse> => {
  const response = await fetch(`${BASE_URL_DEV}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseData: LoginUserResponse = await response.json();

  if (!response.ok) {
    const error = new Error(
      responseData.msg || 'Failed to login'
    ) as CustomAPIError;
    error.info = responseData;
    error.status = response.status;
    throw error;
  }

  return responseData;
};
