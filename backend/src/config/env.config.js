import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.APP_PORT,
  host: process.env.APP_HOST,
  mongoURI: process.env.MONGO_URI,
  mongoTestURI: process.env.MONGO_TEST_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
