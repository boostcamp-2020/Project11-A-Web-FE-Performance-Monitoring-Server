import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '3000';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

export default {
  mode: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
};
