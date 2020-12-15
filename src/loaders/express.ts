import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import morgan from 'morgan';
import moment from 'moment';
import bodyParser from 'body-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import config from '@config/server';
import swaggerConfig from '@config/swagger';
import { logger, stream } from '@config/winston';
import HttpException from '@interfaces/express/httpException';
import routes from '@api/route';

export default ({ app }: { app: Application }): void => {
  // app.use(morgan('dev'));
  config.mode === 'development'
    ? app.use(morgan('dev'))
    : app.use(morgan('combined', { stream }));

  // CORS 옵션 설정
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(compress());
  app.use(json());
  app.use(urlencoded({ extended: false })); // extended false or true
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/status', (req, res) => {
    return res.status(200).end();
  });

  // 라우터 설정
  if (config.mode === 'production') {
    const optionJson = fs.readFileSync(path.join(__dirname, 'swagger.json'));
    const swaggerOption = JSON.parse(optionJson.toString());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOption));
  } else {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }
  app.use('/', routes);

  app.use((req, res, next) => {
    return next(createError(404, 'Not Found'));
  });

  app.use(
    (err: HttpException, req: Request, res: Response, _next: NextFunction) => {
      if (!err.status) {
        err = createError(err);
      }

      if (config.mode === 'production') {
        const errObj = {
          req: {
            headers: req.headers,
            query: req.query,
            body: req.body,
            route: req.route,
          },
          error: {
            message: err.message,
            stack: err.stack,
            status: err.status,
          },
          user: req.user,
        };

        logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')}`, errObj);
      }

      return res.status(err.status).json({ message: err.message });
    },
  );
};
