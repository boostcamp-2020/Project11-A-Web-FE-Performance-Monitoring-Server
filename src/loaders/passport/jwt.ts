import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { jwtPayload as IJwtPayload } from '@interfaces/express/jwtPayload';

import db from '@models';
import passportConfig from '@config/passport';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 로컬스토리지 방식으로 구현해야 합니다.
  secretOrKey: passportConfig.secretOrKey,
};

const jwtFn = async (jwtPayload: IJwtPayload, done: VerifiedCallback) => {
  try {
    const user = await db.User.findOne({ email: jwtPayload.email });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

export default new Strategy(opts, jwtFn);
