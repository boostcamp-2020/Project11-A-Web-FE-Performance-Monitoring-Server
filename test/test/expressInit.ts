import request from 'supertest';
import app from '@root/test';

export default describe('Start Express', () => {
  test('It should response the GET method', async (done) => {
    const asyncapp = await app;
    request(asyncapp).get('/status').expect(200, done);
  });
});
