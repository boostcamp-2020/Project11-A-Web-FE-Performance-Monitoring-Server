import { User as IUser } from '@interfaces/user';
import mongoose from 'mongoose';

const Project = new mongoose.Schema(
  {
    platform: {
      type: String,
      index: true,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    projectName: { type: String, index: true, required: true },

    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('Project', Project);
