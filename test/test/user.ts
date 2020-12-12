import request from 'supertest';
import app from '@root/test';
import loginFunction from '@test/services/loginAsync';
import { users } from '@test/models';

export default describe('User', () => {
  const auth: { token?: string } = {};
  beforeAll(async () => await loginFunction(auth));

  test('UserCheck with Token', (done) => {
    request(app)
      .get('/api/auth/tokenCheck')
      .set('Authorization', 'bearer ' + auth.token)
      .expect((res) => {
        Object.keys(res.body).forEach((key) => {
          if (key !== 'email') {
            delete res.body[key];
          }
        });
      })
      .expect(200, {
        email: users[0].email,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
