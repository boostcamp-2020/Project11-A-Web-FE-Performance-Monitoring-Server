import { Application } from 'express';
import passport from 'passport';

import passportLocal from './local';
import passportJwt from './jwt';

export default (app: Application): void => {
  app.use(passport.initialize());

  passport.use(passportLocal);
  passport.use(passportJwt);

  console.log('🍗 passport Connect! 🍗');
};
