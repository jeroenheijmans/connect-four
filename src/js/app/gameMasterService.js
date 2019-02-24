import { Board, Match } from '../domain'

export const gameMasterServiceWithDeps = [() => {
  const service = {
    board: new Board(),
    currentMatch: new Match()
  };

  service.startNewMatch = () => {
    service.currentMatch = new Match();
    service.currentMatch.start(service.board);
  };

  service.undo = () => {
    if (service.currentMatch.canUndo()) {
      service.currentMatch.undo();
    }
  };

  service.redo = () => {
    if (service.currentMatch.canRedo()) {
      service.currentMatch.redo();
    }
  };

  return service;
}];
