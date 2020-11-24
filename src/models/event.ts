import { Event as IEvent } from '@interfaces/event';
import mongoose from 'mongoose';

const Event = new mongoose.Schema(
  {
    issueId: String,
    createdBy: {
      ip: String,
      email: String,
      userId: String,
    },
    os: {
      version: String,
      name: String,
    },
    browser: {
      version: String,
      name: String,
    },
  },
  { timestamps: true },
);
export default mongoose.model<IEvent & mongoose.Document>('Event', Event);
