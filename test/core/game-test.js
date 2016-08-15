import expect from 'expect';
import Game from '../../src/core/game';
import { BOARD_PADDING, ROW_SIZE, COL_SIZE, FINISH_SIZE, PIECE_SIZE, RED_TURN, YELLOW_TURN } from '../../src/constants';

describe('Game', () => {
  const game = new Game();
  it('should init game', () => {
    game.init();
    expect(game).toIncludeKeys(['pieces','result','animatedPiece','isAnimating']);
    expect(Object.keys(game.pieces).length).toEqual(ROW_SIZE * COL_SIZE);
    expect(game.result).toEqual(null);
    expect(game.animatedPiece).toEqual(null);
    expect(game.isAnimating).toEqual(false);
  });

  it(`should have value ${YELLOW_TURN} after playing at column 1`, () => {
    game.init();
    game.playAtColWithValue(1,YELLOW_TURN);
    expect(game.getPieceAt(0,1).value).toEqual(YELLOW_TURN);
  });

  describe('canPlayAt', () => {
    it('should be able to play at col 1', () => {
      game.init();
      expect(game.canPlayAt(1)).toEqual(true);
    });

    it('should not be able to play at col 1', () => {
      game.init();
      game.playAtColWithValue(1,RED_TURN);
      game.playAtColWithValue(1,YELLOW_TURN);
      game.playAtColWithValue(1,RED_TURN);
      game.playAtColWithValue(1,YELLOW_TURN);
      game.playAtColWithValue(1,RED_TURN);
      game.playAtColWithValue(1,YELLOW_TURN);
      expect(game.canPlayAt(1)).toEqual(false);
    });
  });

  describe('playAtColWithValue', () => {
    it('should have isAnimating true', () => {
      game.init();
      game.playAtColWithValue(1,RED_TURN);
      expect(game.isAnimating).toEqual(true);
    });

    it(`should have animatedPiece set with row 0 col 1 and value = ${YELLOW_TURN}`, () =>{
      game.init();
      game.playAtColWithValue(1,YELLOW_TURN);
      const { animatedPiece } = game;
      expect(animatedPiece).toIncludeKeys(['row','col','value','name','from','to']);
      expect(animatedPiece.row).toEqual(0);
      expect(animatedPiece.col).toEqual(1);
      expect(animatedPiece.name).toEqual('animatedPiece01');
      expect(animatedPiece.value).toEqual(YELLOW_TURN);
    });

    it('should return true as animated piece for row 0 and col 1', () => {
      expect(game.isAnimatedPiece(0,1)).toEqual(true);
    });

    it('should return false as animated piece for row 0 col 2', () =>{
      expect(game.isAnimatedPiece(0,2)).toEqual(false);
    });
  });

  describe('updateResults', () => {
    game.init();
    it('should set all peices value to 3', ()=> {
      game.updateResults([{ row: 0, col : 0 }, { row:1, col: 0 }],2);
      expect(game.pieces['00'].value).toEqual(3);
      expect(game.pieces['10'].value).toEqual(3);
    });

    it('should set result property', () => {
        game.updateResults([{ row: 0, col : 0 }, { row:1, col: 0 }],2);
      expect(game.result).toNotEqual(null);
      expect(game.result).toIncludeKey('type');
      expect(game.result.type).toEqual(2);
    });
  });

 describe('gameHasFinished' , () => {
   it('should have game finished. virtically', () => {
     game.init();
     game.playAtColWithValue(0,RED_TURN);
     game.playAtColWithValue(0,RED_TURN);
     game.playAtColWithValue(0,RED_TURN);
     game.playAtColWithValue(0,RED_TURN);
     expect(game.result).toIncludeKeys(['type','game']);
     expect(game.result.type).toEqual(RED_TURN);
     expect(game.result.game.length).toEqual(4);
     expect(game.gameHasFinished(RED_TURN)).toEqual(true);
     expect(game.gameHasFinishedVertically(0,0,RED_TURN)).toEqual(true);
   });

   it('should finish game horizontally', () => {
     game.init();
     game.playAtColWithValue(0,RED_TURN);
     game.playAtColWithValue(1,RED_TURN);
     game.playAtColWithValue(2,RED_TURN);
     game.playAtColWithValue(3,RED_TURN);
     expect(game.gameHasFinishedHorizontally(0,0,RED_TURN)).toEqual(true);
     expect(game.gameHasFinished(RED_TURN)).toEqual(true);
   });
 });
});
