import catchErrorService from '@services/catchError';
import { Response } from 'express';
import { SDKRequest } from '@interfaces/express/sdkRequest';

const catchError = (req: SDKRequest, res: Response): void => {
  try {
    const event = req.body;
    catchErrorService(event);
    return res.status(200).end();
  } catch (error) {
    console.error(error);
  }
};

export default { catchError };
