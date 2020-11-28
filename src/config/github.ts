import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("🔒  Couldn't find .env file  🔒");
}

export default {
  client_id: process.env.GITHUB_CLIENT_ID as string,
  client_secret: process.env.GITHUB_CLIENT_SECRET as string,
};
