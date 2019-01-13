class Brick {
  constructor(height, width, position) {
    this.height = height;
    this.width = width;
    this.position = position;
  }

  changeVelocity(velocity) {
    velocity.negateY();
  }
}