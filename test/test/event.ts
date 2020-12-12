import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import getProject from '@test/services/getFirstProject';
import getIssue from '@test/services/getFirstIssue';
import { sdks } from '@test/models';

export default describe('Event', () => {
  const auth: { token?: string } = {};
  const project: {
    _id?: string;
    token?: string;
  } = {};
  const issue: {
    _id?: string;
  } = {};
  beforeAll(async () => {
    await loginFunction(auth);
    await getProject(auth, project);
    await getIssue(auth, project, issue);
  });
});
