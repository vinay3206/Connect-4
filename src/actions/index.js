import { NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, } from '../constants';

export function newGame () {
  return {
    type: NEW_GAME,
  };
}

export function playWithRed (col) {
  return {
    type: PLAY_WITH_RED,
    col,
  };
}

export function playWithYellow (col) {
  return {
    type: PLAY_WITH_YELLOW,
    col,
  };
}
