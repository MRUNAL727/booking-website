import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'You are not authenticated'));
  } else {
    jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
      if (err) {
        return next(createError(403, 'Invalid token'));
      } else {
        req.user = user;
        next();
      }
    });
  }
};
