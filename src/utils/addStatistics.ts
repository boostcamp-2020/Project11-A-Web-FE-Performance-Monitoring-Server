const addStatistics = (obj: any, key: string, add: string): void => {
  if (!obj[key]) {
    obj[key] = {};
  }
  obj[key][add] = obj[key][add] ? obj[key][add] + 1 : 1;
};

export default addStatistics;
