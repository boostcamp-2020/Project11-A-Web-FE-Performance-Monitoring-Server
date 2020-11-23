import db from '@models';
import { Event } from '@interfaces/event';

const catchErrorService = (event: Event) => {
  const errorSample = new db.Event(event);
  errorSample.save();
};
export default catchErrorService;
