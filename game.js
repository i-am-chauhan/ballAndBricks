class Wall {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Paddle {
  constructor(height, width, left, bottom, speed) {
    this.height = height;
    this.width = width;
    this.left = left;
    this.bottom = bottom;
    this.speed = speed;
  }

  moveLeft() {
    this.left = this.left - this.speed;
  }

  moveRight() {
    this.left = this.left + this.speed;
  }
}


class Velocity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  negateX() {
    this.x = -1 * this.x;
  }

  negateY() {
    this.y = -1 * this.y;
  }
}

class Ball {
  constructor(radius, left, bottom, velocity) {
    this.radius = radius;
    this.left = left;
    this.bottom = bottom;
    this.velocity = velocity;
  }

  moveBall() {
    this.left += this.velocity.x;
    this.bottom += this.velocity.y;
  }
}

class Game {
  constructor(ball, paddle, wall) {
    this.ball = ball;
    this.paddle = paddle;
    this.wall = wall;
  }

  checkCollideAndGetNewVelocity() {
    const maxLeftPosition = this.wall.width - 2*this.ball.radius;
    const maxBottomPosition = this.wall.height - 2*this.ball.radius;
    if (this.ball.left >= maxLeftPosition) this.ball.velocity.negateX();
    if (this.ball.left <= 0) this.ball.velocity.negateX();
    if (this.ball.bottom >= maxBottomPosition) this.ball.velocity.negateY();
    if (this.ball.bottom <= 0) this.ball.velocity.negateY();
  }
}