import catchErrorService from '@services/catchError';
import { Response, Request } from 'express';

const catchError = (req: Request, res: Response): void => {
  try {
    const event = req.body;
    catchErrorService(event);
    return res.status(200).end();
  } catch (error) {
    console.error(error);
  }
};

export default { catchError };
