import { Application } from 'express';

import express from './express';
import mongooseLoader from './mongoDB';

export default async ({ app }: { app: Application }) => {
  await mongooseLoader();
  console.log('🍟 Mongoose Connect! 🍟');

  express({ app });
  console.log('🍟 Express Connect! 🍟');
};
