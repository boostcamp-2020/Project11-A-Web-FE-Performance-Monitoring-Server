import { User as IUser } from '@interfaces/models/user';
import mongoose from 'mongoose';

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
    },

    projectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
