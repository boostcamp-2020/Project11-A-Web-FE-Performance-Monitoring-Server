import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import getProject from '@test/services/getFirstProject';
import { sdks } from '@test/models';

export default describe('SDK', () => {
  const auth: { token?: string } = {};
  const project: {
    _id?: string;
    token?: string;
  } = {};
  beforeAll(async () => {
    await loginFunction(auth);
    await getProject(auth, project);
  });

  test('Send SDK Error', (done) => {
    request(app)
      .post('/sdk/event')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + project.token)
      .send(sdks[0])
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Send Message', (done) => {
    request(app)
      .post('/sdk/event')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + project.token)
      .send(sdks[1])
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
