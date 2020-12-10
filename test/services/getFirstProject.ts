import request from 'supertest';
import app from '@root/test';

type Auth = {
  token?: string;
};

type Project = {
  _id?: string;
  token?: string;
};

export default async (auth: Auth, project: Project): Promise<void> => {
  const projectRes = await request(app)
    .get('/api/project')
    .set('Authorization', 'bearer ' + auth.token);
  project._id = projectRes.body.docs[0]._id;
  const tokenRes = await request(app)
    .get(`/api/project/${project._id}`)
    .set('Authorization', 'bearer ' + auth.token);
  project.token = tokenRes.body.sdkToken;
};
