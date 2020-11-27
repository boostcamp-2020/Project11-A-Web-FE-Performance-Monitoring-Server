import db from '@models';
import { Project } from '@interfaces/project';
import jwt from 'jsonwebtoken';
import passportConfig from '@config/passport';

const create = async (project: Project): Promise<string> => {
  try {
    const projectDoc = await new db.Project(project);
    await db.User.findOneAndUpdate(
      { _id: project.owner },
      { $addToSet: { projectIds: projectDoc._id } },
      // { $push: { projectIds: projectDoc._id } }, 중복 가능 코드, https://kb.objectrocket.com/mongo-db/using-nodejs-and-mongoose-to-update-array-1205
    );
    const token = jwt.sign(projectDoc._id.toJSON(), passportConfig.secretOrKey);
    await projectDoc.save();
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

export default create;
