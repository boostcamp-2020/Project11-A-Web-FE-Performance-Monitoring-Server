const alertLevel = [
  'fatal',
  'critical',
  'error',
  'warning',
  'log',
  'info',
  'debug',
];

const alertCheck = (projectLevel: string, eventLevel: string): boolean => {
  if (projectLevel.toLowerCase() === 'unsubscribe') {
    return false;
  }
  if (!alertLevel.includes(eventLevel)) {
    throw '존재하지 않는 알림레벨입니다.';
  }
  return alertLevel.indexOf(projectLevel) >= alertLevel.indexOf(eventLevel);
};

export { alertCheck, alertLevel };
