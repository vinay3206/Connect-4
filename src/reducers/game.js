import { NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, RED_TURN, YELLOW_TURN } from '../constants';
import Game from '../core/game';


const initialState = {
  board: new Game(),
  playingNow: RED_TURN,
};

export default function counter (state = initialState, action) {
  const { board } = state;

  switch (action.type) {
    case NEW_GAME:
      board.initiate();

      return {
        ...initialState,
        board,
      };
    case PLAY_WITH_RED:
    case PLAY_WITH_YELLOW:
      const value = action.type === PLAY_WITH_RED ? RED_TURN : YELLOW_TURN;

      board.playAtColWithValue(action.col, value);

      return {
        board,
        playingNow: action.type === PLAY_WITH_RED ? YELLOW_TURN : RED_TURN,
      };
    default:
      return state;
  }
}
