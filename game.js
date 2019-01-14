class Game {
  constructor(ball, paddle, wall, bricks) {
    this.ball = ball;
    this.paddle = paddle;
    this.wall = wall;
    this.bricks = bricks;
  }

  isBallCollideWithWall() {
    const maxLeftPosition = this.wall.width - 2 * this.ball.radius;
    return this.ball.position.X >= maxLeftPosition || this.ball.position.X <= 0;
  }

  isBallInRangeOf(element) {
    const collidalRange = element.position.X + element.width;
    const collidalPositionOfBall = this.ball.position.X + this.ball.radius;
    return element.position.X <= collidalPositionOfBall
      && collidalPositionOfBall <= collidalRange;
  }

  isBallCollidedWithPaddle() {
    const maxCollidalLength = this.paddle.position.Y + this.paddle.height;
    return this.ball.position.Y <= maxCollidalLength && this.isBallInRangeOf(this.paddle);
  }

  validateBallMovement() {
    const maxBottomPosition = this.wall.height - 2 * this.ball.radius;
    if (this.isBallCollideWithWall()) this.wall.changeVelocity(this.ball.velocity);
    if (this.ball.position.Y >= maxBottomPosition) this.ball.velocity.negateY();
    if (this.isBallCollidedWithPaddle()) this.paddle.changeVelocity(this.ball.velocity);
  }

  validatePaddlePosition() {
    const maxLeftPosition = this.wall.width - this.paddle.width;
    if (this.paddle.position.X <= 0)
      this.paddle.position.setPositionX(0);
    if (this.paddle.position.X >= maxLeftPosition)
      this.paddle.position.setPositionX(maxLeftPosition);
  }

  isBrickCollidedWithBall(brick) {
    const maxCollidalLength = this.ball.position.Y + 2 * this.ball.radius;
    return maxCollidalLength >= brick.position.Y && this.isBallInRangeOf(brick);
  }

  getInfoOfballBrickCollision() {
    let validatedBricks = { remainingBricks: [] };
    let collisionData = { isCollided: false };
    this.bricks.list.forEach(function (brick) {
      if (this.isBrickCollidedWithBall(brick)) {
        validatedBricks.removedBrick = brick;
        validatedBricks.removedBrick.changeVelocity(this.ball.velocity);
        collisionData = { isCollided: true, brick: validatedBricks.removedBrick };
        return;
      }
      validatedBricks.remainingBricks.push(brick);
    }, this);
    this.bricks.list = validatedBricks.remainingBricks;
    return collisionData;
  }
}