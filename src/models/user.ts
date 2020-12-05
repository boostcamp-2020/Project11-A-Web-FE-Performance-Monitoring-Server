import { User as IUser } from '@interfaces/models/user';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import IPagination from '@interfaces/pagenation';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },

    pwd: {
      type: String,
      trim: true,
    },

    nickname: {
      type: String,
      index: true,
    },

    projectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true },
);

User.plugin(mongoosePaginate);
export default mongoose.model<IUser & mongoose.Document>(
  'User',
  User,
) as IPagination<IUser & mongoose.Document>;
