import { Event as IEvent } from '@interfaces/models/event';
import IPagination from '@interfaces/pagination';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Event = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  release: String,
  environment: String,
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
  errorContexts: {
    preErrorContext : [String],
    errorContext : [String],
    postErrorContext : [String],
  },
  level: String,
});

Event.plugin(mongoosePaginate);
export default mongoose.model<IEvent & mongoose.Document>(
  'Event',
  Event,
) as IPagination<IEvent & mongoose.Document>;
