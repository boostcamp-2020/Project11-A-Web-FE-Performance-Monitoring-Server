import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import { projects } from '@test/models';

export default describe('Project', () => {
  test('Should require authorization', (done) => {
    request(app)
      .get('/api/project')
      .expect(401)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  const auth: { token?: string } = {};
  beforeAll(async () => await loginFunction(auth));

  test('Has no project', (done) => {
    request(app)
      .get('/api/project')
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
        docs: 0,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Create Project', (done) => {
    request(app)
      .post('/api/project')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send(projects[0])
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Create Project with Emails', (done) => {
    request(app)
      .post('/api/project')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send(projects[1])
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`Create Project with wrong Emails [email: ${projects[2].emails?.[0]}]`, (done) => {
    request(app)
      .post('/api/project')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + auth.token)
      .send(projects[2])
      .expect(500, {
        message: `${projects[2].emails?.[0]}는 올바른 이메일 형식이 아닙니다.`,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Result Create 2 Projects', (done) => {
    request(app)
      .get('/api/project')
      .set('Authorization', 'bearer ' + auth.token)
      .expect((res) => {
        Object.keys(res.body).forEach((key) => {
          if (key === 'docs') {
            res.body[key] = res.body[key].length;
          } else {
            delete res.body[key];
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
});
