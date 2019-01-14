const movePaddle = function (document, game) {
  if (event.key == "ArrowRight") game.paddle.moveRight();
  if (event.key == "ArrowLeft") game.paddle.moveLeft();
  game.validatePaddlePosition();
  drawPaddle(document, game.paddle);
}

const createElements = function (document, paddle, ball, wall) {
  createWallDiv(document);
  createPaddleDiv(document);
  createBallDiv(document);
  drawWallDiv(document, wall);
  drawPaddle(document, paddle);
  drawBall(document, ball);
}

const removeBrickDiv = function (document, brick) {
  const brickId = convertPositionToId(brick.position.X, brick.position.Y);
  const brickDiv = document.getElementById(brickId);
  brickDiv.remove();
}

const moveBall = function (document, game) {
  setInterval(() => {
    game.validateBallMovement();
    let { isCollided, brick } = game.getInfoOfballBrickCollision();
    if (isCollided) removeBrickDiv(document, brick);
    game.ball.moveBall();
    drawBall(document, game.ball);
  }, 10)
}

const createAndDrawBricks = function (wall, noOfRows, noOfBricksInRow) {
  const width = wall.width / noOfBricksInRow;
  const height = wall.height / (4 * noOfRows);
  let positionX = 0;
  let positionY = wall.height;
  let bricks = new Bricks();
  for (let row = 0; row < noOfRows; row++) {
    positionY = positionY - height;
    for (let col = 0; col < noOfBricksInRow; col++) {
      let brick = createDivAndDraw(height, width, positionX, positionY);
      positionX += width;
      if (positionX >= wall.width) positionX = 0;
      bricks.inject(brick);
    }
  }
  return bricks;
}

const initialise = function (document, ball, paddle, wall, bricks) {
  const game = new Game(ball, paddle, wall, bricks);
  const screen = document.getElementById('screen');
  screen.onkeydown = movePaddle.bind(null, document, game);
  moveBall(document, game);
}

window.onload = () => {
  const wall = new Wall(600, 700);
  const paddle = new Paddle(20, 120, new Position(340, 1), 20);
  const velocity = new Velocity(3, -3);
  const ball = new Ball(15, new Position(390, 20), velocity);
  createElements(document, paddle, ball, wall);
  const bricks = createAndDrawBricks(wall, 10, 10);
  initialise(document, ball, paddle, wall, bricks);
}