import { Event as IEvent } from '@interfaces/models/event';
import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  createdBy: {
    ipAddress: String,
  },
  sdk: {
    version: String,
    name: String,
  },
  os: {
    version: String,
    name: String,
  },
  browser: {
    version: String,
    name: String,
  },
  timeStamp: Date,
  url: String,
  stacktrace: [Object],
  contexts: Object,
  message: String,
  version: String,
  platform: String,
  serverName: String,
  transaction: String,
  userIp: String,
  errorContexts: [[String]],
  level: String,
});
export default mongoose.model<IEvent & mongoose.Document>('Event', Event);
