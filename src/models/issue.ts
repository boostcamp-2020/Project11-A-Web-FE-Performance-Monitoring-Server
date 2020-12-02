import { Issue as IIssue } from '@interfaces/issue';
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

    errorName: {
      type: String,
      required: true,
    },

    errorMessage: {
      type: String,
      require: true,
    },

    isResolved: { type: Boolean, required: true },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  },
  { timestamps: true },
);

Issue.plugin(mongoosePaginate);
export default mongoose.model<IIssue & mongoose.Document>(
  'Issue',
  Issue,
) as IPagination<IIssue & mongoose.Document>;
