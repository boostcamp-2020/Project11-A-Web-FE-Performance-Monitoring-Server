import { Strategy, IVerifyOptions } from 'passport-local';
import jwt from 'jsonwebtoken';

import { User } from '@interfaces/user';
import { Document } from 'mongoose';
import passportConfig from '@config/passport';
import bcrypt from '@root/utils/passwordBcrypt';
import db from '@models';

const localConfig = {
  usernameField: 'email',
  passwordField: 'pwd',
  session: false,
};

const localFunction = async (
  email: string,
  pwd: string,
  done: (
    error: Error | null,
    user?: (User & Document) | false,
    options?: IVerifyOptions | undefined,
  ) => void,
) => {
  const user = await db.User.findOne({ email });
  if (!user) {
    return done(new Error('가입되지 않은 이메일입니다.'), false);
  }
  const isCorrectPassword = await bcrypt.checkPw(pwd, user.pwd);
  if (!isCorrectPassword) {
    return done(new Error('비밀번호가 다릅니다.'), false);
  }
  const token = jwt.sign(user.toJSON(), passportConfig.secretOrKey);
  return done(null, { ...user.toJSON(), token });
};

export default new Strategy(localConfig, localFunction);
