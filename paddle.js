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