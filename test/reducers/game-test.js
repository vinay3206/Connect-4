import expect from 'expect';
import reducer from '../../src/reducers/game';
import { NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, RED_TURN, YELLOW_TURN } from '../../src/constants';
import Game from '../../src/core/game';


describe('Game reducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      board: new Game(),
      playingNow: RED_TURN
    };
    expect(reducer(undefined,{})).toEqual(expectedState);
  });
  it('should handle NEW_GAME', () => {
    const initialState = {
      board: new Game(),
      playingNow: RED_TURN
    };
    const action = {
      type: NEW_GAME
    };
    expect(reducer(initialState,action)).toEqual(initialState);
  });
  it('should handle PLAY_WITH_RED', () => {
    const col = 1;
    const initialState = {
      board: new Game(),
      playingNow: RED_TURN
    };
    const action = {
      type: PLAY_WITH_RED,
      col
    };
    var expectedBoard = new Game();
    expectedBoard.playAtColWithValue(col,RED_TURN);
    const expectedState = {
      board: expectedBoard,
      playingNow: YELLOW_TURN
    }
    expect(reducer(initialState,action)).toEqual(expectedState);
  });
  it('should handle PLAY_WITH_YELLOW', () => {
    const col = 1;
    const initialState = {
      board: new Game(),
      playingNow: YELLOW_TURN
    };
    const action = {
      type: PLAY_WITH_YELLOW,
      col
    };
    var expectedBoard = new Game();
    expectedBoard.playAtColWithValue(col,YELLOW_TURN);
    const expectedState = {
      board: expectedBoard,
      playingNow: RED_TURN
    }
    expect(reducer(initialState,action)).toEqual(expectedState);
  });
});
