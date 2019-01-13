class Wall {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  changeVelocity(velocity) {
    velocity.negateX();
  }
}

class Position {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  setPositionX(position) {
    this.X = position;
  }

  setPositionY(position) {
    this.Y = position;
  }
}

class Paddle {
  constructor(height, width, position, speed) {
    this.height = height;
    this.width = width;
    this.position = position;
    this.speed = speed;
  }

  moveLeft() {
    this.position.X = this.position.X - this.speed;
  }

  moveRight() {
    this.position.X = this.position.X + this.speed;
  }

  changeVelocity(velocity) {
    velocity.negateY();
  }
}

class Velocity {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  negateX() {
    this.X = -1 * this.X;
  }

  negateY() {
    this.Y = -1 * this.Y;
  }
}

class Ball {
  constructor(radius, position, velocity) {
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
  }

  moveBall() {
    this.position.X += this.velocity.X;
    this.position.Y += this.velocity.Y;
  }
}

class Bricks {
  constructor(height, width,position){
    this.height = height;
    this.width = width;
    this.position = position;
  }
}

class Game {
  constructor(ball, paddle, wall) {
    this.ball = ball;
    this.paddle = paddle;
    this.wall = wall;
  }

  isBallCollideWithWall() {
    const maxLeftPosition = this.wall.width - 2 * this.ball.radius;
    return this.ball.position.X >= maxLeftPosition || this.ball.position.X <= 0;
  }

  isBallInRangeOfPaddle() {
    const collidalRange = this.paddle.position.X + this.paddle.width;
    const collidalPositionOfBall = this.ball.position.X + this.ball.radius;
    return this.paddle.position.X <= collidalPositionOfBall
      && collidalPositionOfBall <= collidalRange;
  }

  isBallCollideWithPaddle() {
    const maxCollidalLength = this.paddle.position.Y + this.paddle.height;
    return this.ball.position.Y <= maxCollidalLength && this.isBallInRangeOfPaddle();
  }

  validateBallMovement() {
    const maxBottomPosition = this.wall.height - 2 * this.ball.radius;
    if (this.isBallCollideWithWall()) this.wall.changeVelocity(this.ball.velocity);
    if (this.ball.position.Y >= maxBottomPosition) this.ball.velocity.negateY();
    if (this.isBallCollideWithPaddle()) this.paddle.changeVelocity(this.ball.velocity);
  }

  validatePaddlePosition() {
    const maxLeftPosition = this.wall.width - this.paddle.width;
    if (this.paddle.position.X <= 0)
      this.paddle.position.setPositionX(0);
    if (this.paddle.position.X >= maxLeftPosition)
      this.paddle.position.setPositionX(maxLeftPosition);
  }
}