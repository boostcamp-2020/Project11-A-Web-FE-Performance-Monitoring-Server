import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

const mongodbUrl = process.env.MONGODB_URI || '';

export default {
  databaseURL: mongodbUrl,
};
