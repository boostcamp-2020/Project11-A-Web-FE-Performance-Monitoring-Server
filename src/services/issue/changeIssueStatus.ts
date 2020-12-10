import db from '@models';

const changeIssueStatus = async (
  userId: string,
  issueList: string[],
): Promise<void> => {
  const issue = await db.Issue.findById(issueList[0]).exec();
  const projectId = issue?.projectId;
  const targetProject = await db.Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { admins: userId }],
  }).exec();
  if (!targetProject) {
    throw '당신의 프로젝트가 아니거나 권한이 없습니다.';
  }
  await Promise.all(
    issueList.map((v) =>
      db.Issue.findOneAndUpdate({ _id: v, projectId }, { isResolved: true }),
    ),
  );
};

export default changeIssueStatus;
