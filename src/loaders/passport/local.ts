import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

import passportConfig from '@config/passport';
import bcrypt from '@root/utils/passwordBcrypt';
import db from '@models';

const localConfig = {
  usernameField: 'email',
  passwordField: 'pwd',
  session: false,
};

const localFunction = async (email: string, pwd: string, done: any) => {
  const user = await db.User.findOne({ email });
  if (!user) {
    return done(null, false, { message: '가입되지 않은 이메일입니다.' });
  }
  const isCorrectPassword = await bcrypt.checkPw(pwd, user.pwd);
  if (!isCorrectPassword) {
    return done(null, false, { message: '비밀번호가 다릅니다.' });
  }
  const token = jwt.sign(user.toJSON(), passportConfig.secretOrKey);
  return done(null, { user, token });
};

export default new Strategy(localConfig, localFunction);
