import db from '@models';
import { User } from '@interfaces/models/user';
import passwordBcrypt from '@utils/passwordBcrypt';

const join = async (userInfo: User): Promise<User> => {
  const { email, pwd } = userInfo;
  const hashedPwd = await passwordBcrypt.hashPw(pwd);
  const user = new db.User({ email, nickname: email, pwd: hashedPwd });
  await user.save();
  return user;
};

export default { join };
