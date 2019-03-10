export const recentMatchesControllerWithDeps = ['$scope', '$timeout', 'gameMaster', 'matchRepository', ($scope, $timeout, gameMaster, matchRepository) => {
  $scope.matchHeaders = matchRepository.matches;

  $scope.startReplay = function(matchHeader) {
    const match = matchRepository.findByTimestamp(matchHeader.timestamp)[0];
    
    match.start(gameMaster.board);

    function delayedMove() {
      if (match.canRedo()) {
        match.redo();
        $timeout(() => delayedMove(), 500);
      }
    }

    delayedMove();
  };

  $scope.clearHistory = () => matchRepository.clear();
}];
