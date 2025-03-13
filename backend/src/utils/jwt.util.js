import jwt from 'jsonwebtoken';
import { config } from '../config/env.config.js';

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};
