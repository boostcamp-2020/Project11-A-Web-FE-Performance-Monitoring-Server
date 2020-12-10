import request from 'supertest';
import app from '@root/test';
import { users } from '@root/../test/models';

type Auth = {
  token?: string;
};

export default async (auth: Auth): Promise<void> => {
  const userRes = await request(app).post('/api/auth/login').send(users[0]);
  auth.token = userRes.body.token;
};
