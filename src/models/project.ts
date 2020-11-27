import { Project as IProject } from '@interfaces/project';
import mongoose from 'mongoose';
import IPagination from '@interfaces/pagenation';
import mongoosePaginate from 'mongoose-paginate-v2';

const Project = new mongoose.Schema(
  {
    platform: {
      type: String,
      index: true,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    projectName: { type: String, index: true, required: true },

    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  },
  { timestamps: true },
);

Project.plugin(mongoosePaginate);
export default mongoose.model<IProject & mongoose.Document>(
  'Project',
  Project,
) as IPagination<IProject & mongoose.Document>;
