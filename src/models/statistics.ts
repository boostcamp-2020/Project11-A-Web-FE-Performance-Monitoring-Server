import { Statistics as IStatistics } from '@interfaces/models/statistics';
import mongoose from 'mongoose';

const Statistics = new mongoose.Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    index: true,
    unique: true,
  },
  release: Object,
  environment: Object,
  sdk: Object,
  os: Object,
  browser: Object,
  url: Object,
  transaction: Object,
  userIp: Object,
  level: Object,
  serverName: Object,
  version: Object,
});

export default mongoose.model<IStatistics & mongoose.Document>(
  'Statistics',
  Statistics,
);
