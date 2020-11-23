import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

process.env.MONGODB_URI = process.env.MONGODB_URI || '';

export default {
  databaseURL: process.env.MONGODB_URI,
};
