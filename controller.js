const applyPixel = (count) => count + "px";

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

const moveBall = function (document, game) {
  setInterval(() => {
    game.validateBallMovement();
    game.ball.moveBall();
    drawBall(document, game.ball);
  }, 10)
}

const initialise = function () {
  const wall = new Wall(600, 800);
  const paddle = new Paddle(20, 120, new Position(340, 1),20);
  const velocity = new Velocity(3, -3);
  const ball = new Ball(20, new Position(380, 20), velocity);
  const game = new Game(ball, paddle, wall);
  createElements(document, paddle, ball, wall);
  const screen = document.getElementById('screen');
  screen.onkeydown = movePaddle.bind(null, document, game);
  moveBall(document, game);
}

window.onload = () => {
  initialise();
}