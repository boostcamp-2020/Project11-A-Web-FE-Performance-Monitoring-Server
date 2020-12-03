import db from '@models';
import { Project } from '@interfaces/models/project';
import createSDKToken from '@utils/createSDKToken';
import emailPattern from '@utils/emailCheck';

const create = async (project: Project): Promise<string> => {
  project.emails?.forEach((v) => {
    if (!emailPattern.test(v)) throw `${v}는 올바른 이메일 형식이 아닙니다.`;
  });
  if (project.issues) {
    throw '새 프로젝트에는 이슈를 추가할 수 없습니다.';
  }
  const members = [project.owner];
  if (project.admins) {
    members.push(...project.admins);
  }
  if (project.members) {
    members.push(...project.members);
  }
  const membersInDB = members.map((v) =>
    db.User.findById(v).catch((err) => {
      throw `${v}는 존재하지 않는 멤버입니다. 에러 상세내용: ${err}`;
    }),
  );
  await Promise.all(membersInDB);
  const projectDoc = await new db.Project(project);
  await Promise.all(
    members.map((memberObjectId) =>
      db.User.findByIdAndUpdate(
        memberObjectId,
        { $addToSet: { projectIds: projectDoc._id } },
        // { $push: { projectIds: projectDoc._id } }, 중복 가능 코드, https://kb.objectrocket.com/mongo-db/using-nodejs-and-mongoose-to-update-array-1205
      ),
    ),
  );
  const token = createSDKToken(projectDoc._id.toJSON());
  await projectDoc.save();
  return token;
};

export default create;
