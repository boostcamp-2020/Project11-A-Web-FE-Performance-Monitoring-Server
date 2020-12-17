import request from 'supertest';
import app from '@root/test';
import { users } from '@test/models';

export default describe('Auth', () => {
  test('SignIn Success', (done) => {
    request(app)
      .post('/api/auth/join')
      .send(users[0])
      .set('Accept', 'application/json')
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`SignIn unvalidated [email: ${users[1].email}]`, (done) => {
    request(app)
      .post('/api/auth/join')
      .send(users[1])
      .set('Accept', 'application/json')
      .expect(500, {
        message: '이메일 규칙이 다릅니다.',
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`SignIn unvalidated [password: ${users[2].pwd}]`, (done) => {
    request(app)
      .post('/api/auth/join')
      .send(users[2])
      .set('Accept', 'application/json')
      .expect(500, {
        message: '비밀번호 규칙이 다릅니다.',
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`SignIn existed [email: ${users[0].email}]`, (done) => {
    request(app)
      .post('/api/auth/join')
      .send(users[0])
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`CheckEmail [email: ${users[0].email}]`, (done) => {
    request(app)
      .post('/api/auth/checkEmail')
      .send({ email: users[0].email })
      .set('Accept', 'application/json')
      .expect(500, {
        message: '이미 존재하는 이메일 입니다.',
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`CheckEmail [email: testEmail@naver.com]`, (done) => {
    request(app)
      .post('/api/auth/checkEmail')
      .send({ email: 'testEmail@naver.com' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test(`Login Corrent Password`, (done) => {
    request(app)
      .post('/api/auth/login')
      .send(users[0])
      .set('Accept', 'application/json')
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

  test(`Login Uncorrent Password`, (done) => {
    request(app)
      .post('/api/auth/login')
      .send({ ...users[0], pwd: '12341234' })
      .set('Accept', 'application/json')
      .expect(500, {
        message: '비밀번호가 다릅니다.',
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
