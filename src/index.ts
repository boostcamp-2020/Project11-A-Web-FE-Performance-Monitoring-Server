import config from '@config/server';

import express from 'express';

import Loader from '@loaders';

async function startServer() {
  const app = express();

  await Loader({ app });

  app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`);
  });
}

startServer();
