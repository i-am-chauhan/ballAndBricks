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
  paddleDiv.style.left = applyPixel(paddle.left);
  paddleDiv.style.bottom = applyPixel(paddle.bottom);
}

const movePaddle = function (document, paddle) {
  if (event.key == "ArrowRight") paddle.moveRight();
  if (event.key == "ArrowLeft") paddle.moveLeft();
  drawPaddle(document, paddle);
}

const drawBall = function (document, ball) {
  const ballDiv = document.getElementById('ball');
  ballDiv.style.height = applyPixel(ball.radius * 2);
  ballDiv.style.width = applyPixel(ball.radius * 2);
  ballDiv.style.left = applyPixel(ball.left);
  ballDiv.style.bottom = applyPixel(ball.bottom);
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

const initialise = function () {
  const wall = new Wall(570, 790);
  const paddle = new Paddle(20, 100, 350, 1, 20);
  const velocity = new Velocity(3, 3);
  const ball = new Ball(20, 380, 22, velocity);
  const game = new Game(ball, paddle, wall);
  createElements(document, paddle, ball, wall);
  const screen = document.getElementById('screen');
  screen.onkeydown = movePaddle.bind(null, document, paddle);
  setInterval(() => {
    game.checkCollideAndGetNewVelocity()
    game.ball.moveBall()
    drawBall(document, game.ball);
  }, 20)
}

window.onload = () => {
  initialise();
}