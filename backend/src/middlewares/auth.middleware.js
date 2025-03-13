import jwt from 'jsonwebtoken';
import { config } from '../config/env.config.js';
import { User } from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
