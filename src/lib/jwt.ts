import jwt from 'jsonwebtoken';

type User = {
  _id: string;
  firstName: string;
  email: string;
};

type TokenInfo = jwt.JwtPayload & User;

export const parseToken = (token: string) => {
  const decodedToken = jwt.decode(token) as TokenInfo;

  const { _id, firstName, email, exp } = decodedToken;

  return {
    userId: _id,
    firstName,
    email,
    tokenExpirationDate: exp as number,
  };
};
