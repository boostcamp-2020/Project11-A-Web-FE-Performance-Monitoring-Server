import { Issue as IIssue } from '@interfaces/issue';
import mongoose from 'mongoose';

const Issue = new mongoose.Schema({
  devMode: String,
  projectId: Number,
  isResolved: Boolean,
});

export default mongoose.model<IIssue & mongoose.Document>('Issue', Issue);
