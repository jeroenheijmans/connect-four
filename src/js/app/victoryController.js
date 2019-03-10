export const victoryControllerWithDeps = ['$rootScope', '$scope', 'gameMaster', 'matchRepository', ($rootScope, $scope, gameMaster, matchRepository) => {
  $rootScope.match = gameMaster.currentMatch;
  $scope.match = gameMaster.currentMatch;
  $scope.startNewMatch = gameMaster.startNewMatch;
  $scope.saveReplay = () => { 
    matchRepository.add(gameMaster.currentMatch);
    gameMaster.startNewMatch();
  };
}];
