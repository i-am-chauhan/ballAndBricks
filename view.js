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

const createBallDiv = function (document) {
  const screen = document.getElementById('screen');
  let ballDiv = document.createElement('div');
  ballDiv.className = 'circle';
  ballDiv.id = 'ball';
  screen.appendChild(ballDiv);
}

const drawBall = function (document, ball) {
  const ballDiv = document.getElementById('ball');
  ballDiv.style.height = applyPixel(ball.radius * 2);
  ballDiv.style.width = applyPixel(ball.radius * 2);
  ballDiv.style.left = applyPixel(ball.position.X);
  ballDiv.style.bottom = applyPixel(ball.position.Y);
}

const createBrickDiv = function (document, id) {
  const screen = document.getElementById('screen');
  let div = document.createElement('div');
  div.id = id;
  div.className = 'brick';
  screen.appendChild(div);
}

const drawBrickDiv = function (document, brick) {
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
  drawBrickDiv(document, brick);
  return brick;
}