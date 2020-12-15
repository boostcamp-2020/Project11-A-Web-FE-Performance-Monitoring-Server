import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import getProject from '@test/services/getFirstProject';
import getIssue from '@test/services/getFirstIssue';
import { comments } from '@test/models';

export default describe('Comment', () => {
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

  test('Get Comment Before Creating', (done) => {
    request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token)
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
        docs: 0,
        page: 1,
        limit: 10,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Create First Comment', (done) => {
    request(app)
      .post('/api/comment')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send({ ...comments[0], issueId: issue._id })
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Create Second Comment', (done) => {
    request(app)
      .post('/api/comment')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send({ ...comments[1], issueId: issue._id })
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Create Comment with wrong issueId', (done) => {
    request(app)
      .post('/api/comment')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send({ ...comments[2], issueId: 'asdfasdfasdf' })
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Result Create 2 Projects', (done) => {
    request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token)
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
        docs: 2,
        page: 1,
        limit: 10,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Comment Pagination Test', (done) => {
    request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .query({
        page: 2,
        limit: 1,
      })
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

  test('Update the Comment', async () => {
    const commentRes = await request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token);
    expect(commentRes.status).toBe(200);
    expect(commentRes.body.docs.length).toBe(2);
    const commentId: string = commentRes.body.docs[0]._id;
    const updateRes = await request(app)
      .patch(`/api/comment/${commentId}`)
      .set('Authorization', 'bearer ' + auth.token)
      .send({ comment: '댓글 변경' });
    expect(updateRes.status).toBe(200);
    const secondRes = await request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token);
    expect(secondRes.status).toBe(200);
    expect(secondRes.body.docs[0].description).toBe('댓글 변경');
  });

  test('Delete the Comment', async () => {
    const commentRes = await request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token);
    expect(commentRes.status).toBe(200);
    expect(commentRes.body.docs.length).toBe(2);
    const commentId: string = commentRes.body.docs[0]._id;
    const deleteRes = await request(app)
      .delete(`/api/comment/${commentId}`)
      .set('Authorization', 'bearer ' + auth.token);
    expect(deleteRes.status).toBe(200);
    const secondRes = await request(app)
      .get(`/api/comment/${issue._id}`)
      .set('Authorization', 'bearer ' + auth.token);
    expect(secondRes.status).toBe(200);
    expect(secondRes.body.docs.length).toBe(1);
  });
});
