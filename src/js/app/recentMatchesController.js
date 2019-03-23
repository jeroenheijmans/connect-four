export const recentMatchesControllerWithDeps = ['$scope', '$timeout', 'gameMaster', 'matchRepository', (
  $scope,
  $timeout,
  gameMaster,
  matchRepository,
) => {
  $scope.matchHeaders = matchRepository.matches;

  $scope.startReplay = async function(matchHeader) {
    const match = matchRepository.findByTimestamp(matchHeader.timestamp)[0];
    
    match.start(gameMaster.board);

    async function delayedMove() {
      if (match.canRedo()) {
        match.redo();
        await $timeout(() => { }, 500);
        await delayedMove();
      }
    }

    await delayedMove();
  };

  $scope.clearHistory = () => matchRepository.clear();
}];
