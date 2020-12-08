import db from '@models';
import { Event } from '@interfaces/models/event';
import { preStatistics } from '@interfaces/models/statistics';
import addUtil from '@utils/addStatistics';

type Key =
  | 'release'
  | 'environment'
  | 'sdk'
  | 'os'
  | 'browser'
  | 'url'
  | 'transaction'
  | 'userIp'
  | 'level'
  | 'serverName'
  | 'version';

const addStatistics = async (issueId: string, event: Event): Promise<void> => {
  const tempDB = db.Statistics.findOne({ issueId }).exec();
  const tempStatistic: preStatistics = {};
  if (event.browser) {
    tempStatistic.browser = event.browser?.name + ' ' + event.browser.version;
    delete event.browser;
  }
  if (event.sdk) {
    tempStatistic.sdk = event.sdk?.name + ' ' + event.sdk.version;
    delete event.sdk;
  }
  if (event.os) {
    tempStatistic.os = event.os?.name + ' ' + event.os.version;
    delete event.os;
  }
  const inputStatistic = { ...event, ...tempStatistic } as preStatistics;
  const targetStatistic = await tempDB;
  if (!targetStatistic) {
    throw '존재하지 않는 통계입니다';
  }
  Object.keys(inputStatistic).forEach((key: string): void => {
    if (typeof inputStatistic[key as Key] !== 'string') {
      return;
    } else {
      const value = inputStatistic[key as Key] as string;
      addUtil(targetStatistic, key, value);
    }
  });
  await db.Statistics.findOneAndUpdate({ issueId }, targetStatistic).exec();
};

export default addStatistics;
