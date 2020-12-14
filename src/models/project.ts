import { Project as IProject } from '@interfaces/models/project';
import mongoose from 'mongoose';
import IPagination from '@interfaces/pagination';
import mongoosePaginate from 'mongoose-paginate-v2';

const Project = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],

    projectName: { type: String, required: true },

    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
        default: [],
      },
    ],

    emails: [{ type: String, default: [] }],

    alertLevel: {
      type: String,
      default: 'error',
    },
  },
  { timestamps: true },
);

Project.plugin(mongoosePaginate);
export default mongoose.model<IProject & mongoose.Document>(
  'Project',
  Project,
) as IPagination<IProject & mongoose.Document>;
