import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

export default {
  mode,
  port: parseInt(port, 10),
};
