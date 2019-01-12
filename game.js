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
