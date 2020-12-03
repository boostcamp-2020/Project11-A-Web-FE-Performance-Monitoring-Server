import { Issue as IIssue } from '@interfaces/models/issue';
import IPagination from '@interfaces/pagenation';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Issue = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    errorName: String, // Error 만 존재

    errorMessage: String, // Error 만 존재

    message: String, // Message 만 존재

    isResolved: { type: Boolean, required: true, default: false },

    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] },
    ],

    events: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: [] },
    ],
  },
  { timestamps: true },
);

Issue.plugin(mongoosePaginate);
export default mongoose.model<IIssue & mongoose.Document>(
  'Issue',
  Issue,
) as IPagination<IIssue & mongoose.Document>;
