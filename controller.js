const applyPixel = (count) => count + "px";
const convertPositionToId = (positionX, positionY) => {
  return `brickX${positionX}Y${positionY}`;
}

const createWallDiv = function (document) {
  const main = document.getElementById('main');
  const wallDiv = document.createElement('div');
  wallDiv.id = 'screen';
  wallDiv.tabIndex = '0';
  wallDiv.className = 'board';
  main.appendChild(wallDiv);
}

const drawWallDiv = function (document, wall) {
  const screen = document.getElementById('screen');
  screen.focus();
  screen.style.height = applyPixel(wall.height);
  screen.style.width = applyPixel(wall.width);
}

const createPaddleDiv = function (document) {
  const screen = document.getElementById('screen');
  let paddleDiv = document.createElement('div');
  paddleDiv.id = 'paddle_1';
  paddleDiv.className = 'paddle';
  screen.appendChild(paddleDiv);
}

const drawPaddle = function (document, paddle) {
  const paddleDiv = document.getElementById('paddle_1');
  paddleDiv.style.height = applyPixel(paddle.height);
  paddleDiv.style.width = applyPixel(paddle.width);
  paddleDiv.style.left = applyPixel(paddle.position.X);
  paddleDiv.style.bottom = applyPixel(paddle.position.Y);
}

const movePaddle = function (document, game) {
  if (event.key == "ArrowRight") game.paddle.moveRight();
  if (event.key == "ArrowLeft") game.paddle.moveLeft();
  game.validatePaddlePosition();
  drawPaddle(document, game.paddle);
}

const drawBall = function (document, ball) {
  const ballDiv = document.getElementById('ball');
  ballDiv.style.height = applyPixel(ball.radius * 2);
  ballDiv.style.width = applyPixel(ball.radius * 2);
  ballDiv.style.left = applyPixel(ball.position.X);
  ballDiv.style.bottom = applyPixel(ball.position.Y);
}

const createBallDiv = function (document) {
  const screen = document.getElementById('screen');
  let ballDiv = document.createElement('div');
  ballDiv.className = 'circle';
  ballDiv.id = 'ball';
  screen.appendChild(ballDiv);
}

const createElements = function (document, paddle, ball, wall) {
  createWallDiv(document);
  createPaddleDiv(document);
  createBallDiv(document);
  drawWallDiv(document, wall);
  drawPaddle(document, paddle);
  drawBall(document, ball);
}

const removeBrick = function(document, brick){
  const screen = document.getElementById('screen');
  const brickId = convertPositionToId(brick.position.X, brick.position.Y);
  const brickDiv = document.getElementById(brickId);
  brickDiv.parentNode.removeChild(brickDiv);
 }

const moveBall = function (document, game) {
  setInterval(() => {
    game.validateBallMovement();
    let { isCollided, brick } = game.getInfoOfballBrickCollision();
    if(isCollided) removeBrick(document, brick);
    game.ball.moveBall();
    drawBall(document, game.ball);
  }, 10)
}

const createBrickDiv = function (document, id) {
  const screen = document.getElementById('screen');
  let div = document.createElement('div');
  div.id = id;
  div.className = 'brick';
  screen.appendChild(div);
}

const drawBricks = function (document, brick) {
  let id = convertPositionToId(brick.position.X, brick.position.Y);
  let div = document.getElementById(id);
  div.style.height = brick.height;
  div.style.width = brick.width;
  div.style.left = brick.position.X;
  div.style.bottom = brick.position.Y;
}

const createDivAndDraw = function (height, width, positionX, positionY) {
  let position = new Position(positionX, positionY);
  let brick = new Brick(height, width, position);
  createBrickDiv(document, convertPositionToId(positionX, positionY));
  drawBricks(document, brick);
  return brick;
}

const createAndDrawBricks = function (wall, noOfRows, noOfBricksInRow) {
  const width = wall.width / noOfBricksInRow;
  const height = wall.height / (4 * noOfRows);
  let positionX = 0;
  let positionY = wall.height - height;
  let bricks = new Array(noOfRows).fill(1).reduce((list, some) => {
    let bricksInRow = new Array(noOfBricksInRow).fill(some).map(() => {
      let brick = createDivAndDraw(height, width, positionX, positionY);
      positionX += width;
      if (positionX >= wall.width) positionX = 0;
      return brick;
    });
    positionY = positionY - height;
    return list.concat(bricksInRow);
  }, [])
  return bricks;
}

const initialise = function () {
  const wall = new Wall(600, 800);
  const paddle = new Paddle(20, 120, new Position(340, 1), 20);
  const velocity = new Velocity(3, -3);
  const ball = new Ball(20, new Position(380, 20), velocity);
  createElements(document, paddle, ball, wall);
  const bricks = createAndDrawBricks(wall, 10, 10);
  const game = new Game(ball, paddle, wall, bricks);
  const screen = document.getElementById('screen');
  screen.onkeydown = movePaddle.bind(null, document, game);
  moveBall(document, game);
}

window.onload = () => {
  initialise();
}