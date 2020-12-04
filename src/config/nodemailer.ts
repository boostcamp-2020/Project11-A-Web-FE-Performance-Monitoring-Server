import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("🔒  Couldn't find .env file  🔒");
}

if (!process.env.MAIL_EMAIL || !process.env.MAIL_PASSWORD) {
  throw new Error('이메일이나 비밀번호가 입력되지 않았습니다.');
}

const mailConfig = {
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

export default mailConfig;
