import { exportMatch, importMatch } from '../domain'

export const matchRepositoryWithDeps = ['dal', (dal) => {

  const service = {
    matches: dal.getAllMatches().map(data => importMatch(data)),
  };

  service.add = match => {
    const data = exportMatch(match);
    dal.saveMatch(data);
    service.matches.unshift(match);
    return data;
  };

  service.getLatestMatch = () => importMatch(dal.getLatestMatch());

  service.findByTimestamp = timestamp => {
    timestamp = parseInt(timestamp, 10);
    return dal.findByTimestamp(timestamp).map(data => importMatch(data));
  };

  service.clear = () => {
    dal.clear();
    service.matches.length = 0;
  };

  return service;
}];
