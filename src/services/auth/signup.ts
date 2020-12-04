import db from '@models';
import { User } from '@interfaces/models/user';
import passwordBcrypt from '@utils/passwordBcrypt';

const join = async (userInfo: User): Promise<User> => {
  try {
    const { email, pwd } = userInfo;
    const hashedPwd = await passwordBcrypt.hashPw(pwd);
    const user = await new db.User({ email, pwd: hashedPwd });
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export default { join };
