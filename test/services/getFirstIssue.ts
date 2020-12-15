import request from 'supertest';
import app from '@root/test';

type Auth = {
  token?: string;
};

type Project = {
  _id?: string;
  token?: string;
};

type Issue = {
  _id?: string;
};

export default async (
  auth: Auth,
  project: Project,
  issue: Issue,
): Promise<void> => {
  const issueRes = await request(app)
    .get(`/api/issue/list/${project._id}`)
    .set('Authorization', 'bearer ' + auth.token)
    .expect(200);
  issue._id = issueRes.body.docs[0]._id;
};
