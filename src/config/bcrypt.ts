import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(" Couldn't find .env file ");
}

export default {
  saltRounds: +(process.env.SALT_ROUNDS as string),
};
