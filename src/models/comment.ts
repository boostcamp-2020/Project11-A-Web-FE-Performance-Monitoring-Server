import { Comment as IComment } from '@interfaces/models/comment';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import IPagination from '@interfaces/pagination';

const Comment = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
  },
  { timestamps: true },
);

Comment.plugin(mongoosePaginate);
export default mongoose.model<IComment & mongoose.Document>(
  'Comment',
  Comment,
) as IPagination<IComment & mongoose.Document>;
