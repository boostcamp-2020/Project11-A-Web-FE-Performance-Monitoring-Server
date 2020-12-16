import { Issue as IIssue } from '@interfaces/models/issue';
import IPagination from '@interfaces/pagination';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Issue = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      index: true,
      required: true,
    },

    eventName: { type: String }, // Error 만 존재

    errorMessage: { type: String }, // Error 만 존재

    errorStack: { type: Object }, // Error 만 존재

    issueType: { type: String },

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

Issue.index(
  { eventName: 1, errorMessage: 1, errorStack: 1, issueType: 1 },
  { unique: true },
);
Issue.plugin(mongoosePaginate);
export default mongoose.model<IIssue & mongoose.Document>(
  'Issue',
  Issue,
) as IPagination<IIssue & mongoose.Document>;
