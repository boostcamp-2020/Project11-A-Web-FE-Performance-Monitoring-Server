import express from 'express';
import Loader from '@loaders/testLoader';

const startServer = () => {
  const app = express();

  Loader({ app });

  return app;
};

export default startServer();
