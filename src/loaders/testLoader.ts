import { Application } from 'express';

import express from './express';

export default ({ app }: { app: Application }): void => {
  express({ app });
  console.log('🍟 Express Connect! 🍟');
};
