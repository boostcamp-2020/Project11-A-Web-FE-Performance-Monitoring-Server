import { Comment as IComment } from '@interfaces/comment';
import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
  },
  { timestamps: true },
);

export default mongoose.model<IComment & mongoose.Document>('Comment', Comment);
