import { Issue as IIssue } from '@interfaces/issue';
import mongoose from 'mongoose';

const Issue = new mongoose.Schema(
  {
    devMode: { type: String, required: true },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    error: {
      type: String,
      required: true,
    },

    isResolved: { type: Boolean, required: true },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  },
  { timestamps: true },
);

export default mongoose.model<IIssue & mongoose.Document>('Issue', Issue);
