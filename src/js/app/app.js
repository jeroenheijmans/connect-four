import angular from 'angular';

import { boardControllerWithDeps } from "./boardController";
import { matchControlsControllerWithDeps } from "./matchControlsController";
import { gameMasterServiceWithDeps } from "./gameMasterService";
import { matchRepositoryWithDeps } from "./matchRepository";
import { recentMatchesControllerWithDeps } from "./recentMatchesController";
import { victoryControllerWithDeps } from "./victoryController";
import { dalWithDeps } from "./dal";

export const connectFourApp = angular
  .module('connectFourApp', [])
  .filter('toLocale', () => (stamp) => (new Date(stamp)).toLocaleString())
  .factory('gameMaster', gameMasterServiceWithDeps)
  .factory('matchRepository', matchRepositoryWithDeps)
  .factory('dal', dalWithDeps)
  .controller('RecentMatchesController', recentMatchesControllerWithDeps)
  .controller('VictoryController', victoryControllerWithDeps)
  .controller('BoardController', boardControllerWithDeps)
  .controller('MatchControlsController', matchControlsControllerWithDeps);
