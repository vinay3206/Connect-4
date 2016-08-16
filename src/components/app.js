import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PIXI from 'pixi.js';

// importing images
import greenIMG from '../images/green.png';
import redIMG from '../images/red.png';
import yellowIMG from '../images/yellow.png';
import emptyIMG from '../images/empty.png';

// importing action creaters
import { newGame, playWithRed, playWithYellow } from '../actions';

// importing all game constats here
import { NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, RED_TURN, YELLOW_TURN, BOARD_PADDING, ROW_SIZE, COL_SIZE, PIECE_SIZE, TEXT_STYLE } from '../constants';

const Renderer = PIXI.autoDetectRenderer;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Texture = PIXI.Texture;
const Text = PIXI.Text;
const size = PIECE_SIZE * COL_SIZE;
const renderer = new Renderer(size + BOARD_PADDING, size + BOARD_PADDING + 200,{ backgroundColor : 0x999999 });
const stage = new Container();

const animOffset = 20;
let animPosition = 0;


class App extends Component {

  init(game){
    this.renderHeader();
    this.renderPIXIBoard(game);
    this.renderScore(game);
  }

  componentWillMount () {
    if (!document.getElementsByTagName('canvas').length) {
      document.body.appendChild(renderer.view);
    }

    const animate = () => {
      this.animatePiece();
      renderer.render(stage);
      requestAnimationFrame(animate);
    };

    animate();
  }

  onPieceMouseDown (e) {
    const { game } = this.props;
    const { board } = game;
    const { target } = e;
    const { isAnimating, result } = board;
    const { playingNow } = game;

    if (result) {
      return;
    }

    if (playingNow !== RED_TURN && this.props.bot || isAnimating) {
      return;
    }

    if (!board.canPlayAt(target.col)) {
      return;
    }

    if(!(this.props.bot) && playingNow == YELLOW_TURN){
      this.props.dispatch(playWithYellow(target.col));
    } else{
      this.props.dispatch(playWithRed(target.col));
    }
  }

  getTextureByValue (type) {
    let img;

    switch (type) {
      default:
      case 0:
        img = emptyIMG;
        break;
      case 1:
        img = redIMG;
        break;
      case 2:
        img = yellowIMG;
        break;
      case 3:
        img = greenIMG;
        break;
    }

    /* eslint-disable new-cap  */
    return new Texture.fromImage(img);
  }

  playWithYellow (board) {
    setTimeout(() => {
      const col = Math.floor((Math.random() * COL_SIZE));
      if (!board.canPlayAt(col)) {
        this.playWithYellow(board);
        return;
      }

      this.props.dispatch(playWithYellow(col));
    }, 500);
  }

  animatePiece () {
    const { game } = this.props;
    const { board, playingNow } = game;
    const { animatedPiece, isAnimating } = board;

    if (!isAnimating || animatedPiece === null) {
      return;
    }

    let pieceSprite = stage.getChildByName(animatedPiece.name);
    const texture = this.getTextureByValue(animatedPiece.value);

    if (pieceSprite === null) {
      pieceSprite = new Sprite(texture);
      stage.addChild(pieceSprite);
    } else {
      pieceSprite.texture = texture;
    }

    if (!pieceSprite.movingDirection) {
      pieceSprite.movingDirection = {
        from: animatedPiece.from,
        to: animatedPiece.to,
      };

      animPosition = pieceSprite.movingDirection.from.y;
      pieceSprite.name = animatedPiece.name;
      pieceSprite.x = pieceSprite.movingDirection.from.x;
    }

    if (animPosition > pieceSprite.movingDirection.to.y) {
      delete pieceSprite.movingDirection;
      board.isAnimating = false;

      if (board.gameHasFinished(animatedPiece.value)) {
        this.renderNewGame(board);
        this.renderPIXIBoard(game);
        this.renderScore(game);
        return;
      }

      if (playingNow === YELLOW_TURN && !board.result && this.props.bot) {
        this.playWithYellow(board);
      }
      return;
    }

    pieceSprite.visible = true;
    pieceSprite.y = animPosition;

    animPosition += animOffset;
  }

  renderHeader () {
    const headerName = `headerElement`;

    let header = stage.getChildByName(headerName);
    if (header !== null) {
      stage.removeChild(header);
    }

    header = new Text('Connect-4', {
      font: 'bold 40px Roboto',
      fill: '#fff',
      align: 'center',
      stroke: '#800000',
      strokeThickness: 10,
      lineJoin: 'round',
    });

    header.anchor.x = 0.5;
    header.anchor.y = 1;
    header.x = renderer.width / 2;
    header.y = 70;
    header.name = headerName;

    stage.addChild(header);
  }

  renderScore ({ board, playingNow }) {
    const { result } = board;
    const scoreName = `scoreElement`;

    let score = stage.getChildByName(scoreName);
    if (score !== null) {
      stage.removeChild(score);
    }

    let text;
    if (result) {
      switch (result.type) {
        default:
        case 0:
          text = 'Draw!';
          break;
        case RED_TURN:
          text = 'You Win!';
          break;
        case YELLOW_TURN:
          text = 'You Lose!';
          break;
      }
    } else {
      text = playingNow === RED_TURN ? `It's your turn.` : `Wait for player.`;
    }

    score = new Text(text, TEXT_STYLE);
    score.x = size;
    score.y = size + BOARD_PADDING / 2 + 20;
    score.name = scoreName;

    stage.addChild(score);
  }

  renderNewGame () {
    const buttonName = `btnNewGame`;

    let text = stage.getChildByName(buttonName);
    if (text !== null) {
      stage.removeChild(text);
    }

    text = new Text('New Game', TEXT_STYLE);
    text.x = 20;
    text.y = 20;
    text.visible = true;
    text.name = buttonName;
    text.interactive = true;
    text.click = () => {
      stage.children
        .filter(item =>
          item.name === buttonName ||
          item.name.indexOf('animatedPiece') !== -1)
        .forEach(item => stage.removeChild(item));

      this.props.dispatch(newGame());
    };
    stage.addChild(text);
  }

  renderPIXIBoard ({ board }) {
    for (let row = 0; row < ROW_SIZE; row++) {
      for (let col = 0; col < COL_SIZE; col++) {
        const piece = board.getPieceAt(row, col);
        const pieceValue = piece.value;

        let texture = this.getTextureByValue(pieceValue);
        if (board.isAnimatedPiece(row, col)) {
          texture = this.getTextureByValue(0);
        }

        let pieceSprite = stage.getChildByName(piece.name);
        if (pieceSprite !== null) {
          stage.removeChild(pieceSprite);
        }
        pieceSprite = new Sprite(texture);
        pieceSprite.x = piece.x;
        pieceSprite.y = piece.y;
        pieceSprite.row = row;
        pieceSprite.col = col;
        pieceSprite.name = piece.name;
        pieceSprite.interactive = true;
        pieceSprite.visible = true;
        pieceSprite.mousedown = (e) => {
          this.onPieceMouseDown(e);
        };
        stage.addChild(pieceSprite);
      }
    }
  }

  render () {
    const { game } = this.props;
    // console.log('props', connect4);
    // console.log(stage, `children: ${stage.children.length}`);
    this.init(game);
    return (
      <div className="app-page page-home">
      </div>
    );
  }
}

App.propTypes = {
  bot: PropTypes.bool
};

App.defaultProps = {
  bot: true
};

export default connect((state) => {
  return {
    game: state.game,
  };
})(App);
