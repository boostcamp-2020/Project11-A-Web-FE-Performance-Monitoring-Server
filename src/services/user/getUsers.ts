import db from '@models';
import { Document, PaginateResult } from 'mongoose';
import { User } from '@interfaces/models/user';
import Option from '@interfaces/pageOption';

const getUsers = async (
  nickname: string,
  option: Option,
): Promise<PaginateResult<User & Document>> => {
  try {
    const userList = await db.User.paginate(
      { nickname: { $regex: nickname, $options: 'i' } },
      {
        ...option,
        select: ['email', 'nickname'],
      },
    );
    return userList;
  } catch (err) {
    throw new Error(err);
  }
};

export default getUsers;
