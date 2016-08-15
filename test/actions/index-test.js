import expect from 'expect';
import * as action from '../../src/actions';
import { NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, } from '../../src/constants';


describe('actions', () => {
  it('should create a action new game', () => {
    const expectedAction = {
      type: NEW_GAME
    };
    expect(action.newGame()).toEqual(expectedAction);
  });

  it('should create a action play with red', () => {
    const col = 1;
    const expectedAction = {
      type: PLAY_WITH_RED,
      col
    };
    expect(action.playWithRed(col)).toEqual(expectedAction);
  });

  it('should create a action play with yello', () => {
    const col = 1;
    const expectedAction = {
      type: PLAY_WITH_YELLOW,
      col
    };
    expect(action.playWithYellow(1)).toEqual(expectedAction);
  });
});
