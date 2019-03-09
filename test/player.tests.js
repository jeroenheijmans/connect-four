import Player from '../src/js/domain/player';

const test = QUnit.test; // TODO: Get this rom an import

QUnit.module("Players", {
});

test("Can create default player", assert => {
  const player = new Player();
  assert.ok(!!player);
});

test("Default player will have default name", assert => {
  const player = new Player();
  assert.ok(!!player.name);
});
