import { beforeFunction, afterFunction } from './setting';

import expressInit from './test/expressInit';
import authTest from './test/auth';
import projectTest from './test/project';
import sdkTest from './test/sdk';
import issueTest from './test/issue';
import commentTest from './test/comment';

beforeAll(async () => {
  await beforeFunction();
});

afterAll(async () => {
  await afterFunction();
});

expressInit;
authTest;
projectTest;
sdkTest;
issueTest;
commentTest;
