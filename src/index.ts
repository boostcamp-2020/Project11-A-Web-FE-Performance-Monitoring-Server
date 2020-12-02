import config from '@config/server';

import express from 'express';

import Loader from '@loaders';

import mongoose from 'mongoose';

const startServer = async () => {
  const app = express();

  await Loader({ app });

  app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`);
    if (typeof process.send === 'function') {
      process.send('ready');
    }
  });

  process.on('SIGINT', function () {
    mongoose.disconnect();
    process.exit(0);
  });
};

startServer();
