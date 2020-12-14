import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import getProject from '@test/services/getFirstProject';
import getIssue from '@test/services/getFirstIssue';
import { sdks } from '@test/models';

export default describe('Issue', () => {
  const auth: { token?: string } = {};
  const project: {
    _id?: string;
    token?: string;
  } = {};
  beforeAll(async () => {
    await loginFunction(auth);
    await getProject(auth, project);
  });

  test('Get Issue', (done) => {
    request(app)
      .get(`/api/issue/list/${project._id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect((res) => {
        Object.keys(res.body).forEach((key) => {
          if (key !== 'docs') {
            delete res.body[key];
          } else {
            res.body[key] = res.body[key].length;
          }
        });
      })
      .expect(200, {
        docs: 2,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Get Issue with Query', (done) => {
    request(app)
      .get(`/api/issue/list/${project._id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .query({ page: 2, limit: 1 })
      .expect((res) => {
        Object.keys(res.body).forEach((key) => {
          if (key === 'docs') {
            res.body[key] = res.body[key].length;
          } else if (key !== 'limit' && key !== 'page') {
            delete res.body[key];
          }
        });
      })
      .expect(200, {
        docs: 1,
        page: 2,
        limit: 1,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Get First Issue', async (done) => {
    const issue: { _id?: string } = {};
    await getIssue(auth, project, issue);
    const issueId = issue._id;
    request(app)
      .get(`/api/issue/${issueId}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect((res) => {
        Object.keys(res.body).forEach((key) => {
          if (key === 'events') {
            res.body[key] = res.body[key].length;
          } else if (key !== 'eventName' && key !== 'errorMessage') {
            delete res.body[key];
          }
        });
      })
      .expect(200, {
        eventName: sdks[0].error?.type,
        errorMessage: sdks[0].error?.value,
        events: 1,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
