import bcrypt from 'bcrypt';

import bcryptConfig from '@config/bcrypt';

const hashPw = (password: string): Promise<string> =>
  new Promise((resolve, _reject) => {
    bcrypt.hash(
      password,
      bcryptConfig.saltRounds,
      (_err: Error, hash: string) => {
        return resolve(hash);
      },
    );
  });

const checkPw = (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve, _reject) => {
    bcrypt.compare(password, hash, (_err: Error, result: boolean) => {
      return resolve(result);
    });
  });

export default { hashPw, checkPw };
