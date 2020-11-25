import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

export default {
  secretOrKey: process.env.JWT_SECRET_KEY as string,
};
