import { User as IUser } from '@interfaces/user';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    pwd: String,

    projectIds: [String],
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
