import { User } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.util.js';

export const signup = async (req, res, next) => {
  const { username, email, password, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    const user = await User.create({ username, email, password, firstname, lastname });
    const token = generateToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({message: "Logged out successfully"});
};

