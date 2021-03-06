import { BOARD_PADDING, ROW_SIZE, COL_SIZE, FINISH_SIZE, PIECE_SIZE } from '../constants';


export default class Game {
  constructor () {
    this.init();
  }

  getRelativePosition (val) {
    return BOARD_PADDING / 2 + val * PIECE_SIZE;
  }

  init() {
    this.pieces = { };
    this.result = null;
    this.animatedPiece = null;
    this.isAnimating = false;

    for (let row = 0; row < ROW_SIZE; row++) {
      const rowPos = (ROW_SIZE - 1) - row;
      for (let col = 0; col < COL_SIZE; col++) {
        const pos = `${row}${col}`;

        this.pieces[pos] = {
          name: `piece${pos}`,
          row,
          col,
          x: this.getRelativePosition(col),
          y: this.getRelativePosition(rowPos),
          value: 0,
        };
      }
    }
  }

  getPieceAt (row, col) {
    return this.pieces[`${row}${col}`];
  }

  canPlayAt (col) {
    for (let row = 0; row < ROW_SIZE; row++) {
      const pos = `${row}${col}`;

      if (this.pieces[pos].value !== 0) {
        continue;
      }

      return true;
    }

    return false;
  }

  playAtColWithValue (col, value) {
    this.isAnimating = true;

    for (let row = 0; row < ROW_SIZE; row++) {
      const pos = `${row}${col}`;

      if (this.pieces[pos].value !== 0) {
        continue;
      }

      this.pieces[pos].value = value;

      this.animatedPiece = {
        row,
        col,
        name: `animatedPiece${pos}`,
        value,
        from: {
          row: 0,
          col,
          x: this.getRelativePosition(col),
          y: this.getRelativePosition(0),
        },
        to: {
          row,
          col,
          x: this.getRelativePosition(col),
          y: this.getRelativePosition(ROW_SIZE - 1 - row),
        },
      };
      break;
    }
  }

  isAnimatedPiece (row, col) {
    return this.isAnimating &&
      this.animatedPiece.row === row &&
      this.animatedPiece.col === col;
  }

  gameHasFinishedHorizontally (x, y, value) {
    const result = [];

    for (let col = y; col < COL_SIZE; col++) {
      const pos = `${x}${col}`;

      if (this.pieces[pos].value !== value) {
        return null;
      }

      result.push({
        row: x,
        col,
        value,
      });

      if (result.length === FINISH_SIZE) {
        return result;
      }
    }

    return null;
  }

  gameHasFinishedVertically (x, y, value) {
    const result = [];

    for (let row = x; row < ROW_SIZE; row++) {
      const pos = `${row}${y}`;

      if (this.pieces[pos].value !== value) {
        return null;
      }

      result.push({
        row,
        col: y,
        value,
      });

      if (result.length === FINISH_SIZE) {
        return result;
      }
    }

    return null;
  }

  gameHasFinishedDiagonallyAsc (x, y, value) {
    const result = [];
    let row = x;
    let col = y;

    while (row < ROW_SIZE && col < COL_SIZE) {
      const pos = `${row}${col}`;

      if (this.pieces[pos].value !== value) {
        return null;
      }

      result.push({
        row,
        col,
        value,
      });

      if (result.length === FINISH_SIZE) {
        return result;
      }

      row++;
      col++;
    }

    return null;
  }

  gameHasFinishedDiagonallyDesc (x, y, value) {
    const result = [];
    let row = x;
    let col = y;

    while (row < ROW_SIZE && col >= 0) {
      const pos = `${row}${col}`;

      if (this.pieces[pos].value !== value) {
        return null;
      }

      result.push({
        row,
        col,
        value,
      });

      if (result.length === FINISH_SIZE) {
        return result;
      }

      row++;
      col--;
    }

    return null;
  }

  gameHasFinished (value) {
    let result;

    for (let row = 0; row < ROW_SIZE; row++) {
      for (let col = 0; col < COL_SIZE; col++) {
        result = this.gameHasFinishedHorizontally(row, col, value);
        if (result) {
          this.updateResults(result, value);
          return true;
        }

        result = this.gameHasFinishedVertically(row, col, value);
        if (result) {
          this.updateResults(result, value);
          return true;
        }

        result = this.gameHasFinishedDiagonallyAsc(row, col, value);
        if (result) {
          this.updateResults(result, value);
          return true;
        }

        result = this.gameHasFinishedDiagonallyDesc(row, col, value);
        if (result) {
          this.updateResults(result, value);
          return true;
        }
      }
    }

    const isDraw = Object.keys(this.pieces)
      .filter(key => this.pieces[key].value !== 0)
      .length === 0;

    if (isDraw) {
      this.updateResults([], 0);
      return true;
    }

    return false;
  }

  updateResults (result, type) {
    result.forEach(item => {
      const { row, col } = item;
      const pos = `${row}${col}`;

      this.pieces[pos].value = 3;
    });

    this.result = {
      type,
      game: result
    };
  }
}
