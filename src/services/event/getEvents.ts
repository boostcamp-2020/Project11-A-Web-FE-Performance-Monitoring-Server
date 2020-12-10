import db from '@models';
import { Event } from '@root/interfaces/models/event';
import { PaginateResult, Document } from 'mongoose';
import Options from '@interfaces/pageOption';
import { InputOption, SearchOption } from '@interfaces/express/searchEvent';

const getEvents = async (
  issueId: string,
  input: InputOption,
  options: Options,
): Promise<PaginateResult<Event & Document>> => {
  let searchOption: SearchOption = {};
  if (input.os) {
    const osOption = input.os.split(' ');
    delete input.os;
    if (osOption.length === 1) {
      searchOption['os.name'] = osOption[0];
    } else {
      searchOption['os.name'] = osOption[0];
      searchOption['os.version'] = osOption[1];
    }
  }
  if (input.sdk) {
    const sdkOption = input.sdk.split(' ');
    delete input.sdk;
    if (sdkOption.length === 1) {
      searchOption['sdk.name'] = sdkOption[0];
    } else {
      searchOption['sdk.name'] = sdkOption[0];
      searchOption['sdk.version'] = sdkOption[1];
    }
  }
  if (input.browser) {
    const browser = input.browser.split(' ');
    delete input.browser;
    if (browser.length === 1) {
      searchOption['browser.name'] = browser[0];
    } else {
      searchOption['browser.name'] = browser[0];
      searchOption['browser.version'] = browser[1];
    }
  }
  searchOption = { ...input, ...searchOption } as SearchOption;
  const Events = await db.Event.paginate(
    { issueId, ...searchOption },
    { ...options },
  );
  return Events;
};

export default getEvents;
