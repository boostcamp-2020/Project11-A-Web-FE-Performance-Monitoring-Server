import jwt from 'jsonwebtoken';

import { User } from '@interfaces/models/user';
import passportConfig from '@config/passport';
import bcrypt from '@root/utils/passwordBcrypt';
import db from '@models';

interface UserWithToken {
  _id: string;
  email: string;
  nickname?: string;
  token: string;
}

const login = async (email: string, pwd: string): Promise<UserWithToken> => {
  const user = await db.User.findOne({ email });
  if (!user) {
    throw '가입되지 않은 이메일입니다.';
  }
  const isCorrectPasswordPromise = bcrypt.checkPw(pwd, user.pwd);
  const token = jwt.sign(user._id.toString(), passportConfig.secretOrKey);
  const isCorrectPassword = await isCorrectPasswordPromise;
  if (!isCorrectPassword) {
    throw '비밀번호가 다릅니다.';
  }
  return { _id: user._id, email: user.email, nickname: user.nickname, token };
};

export default login;
