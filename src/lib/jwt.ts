import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  username: string;
  email: string;
}

type TokenInfo = jwt.JwtPayload & User;

export const parseToken = (token: string) => {
  const decodedToken = jwt.decode(token) as TokenInfo;

  const { _id, username, email, exp } = decodedToken;

  return {
    userId: _id,
    username,
    email,
    tokenExpirationDate: exp as number,
  };
};
