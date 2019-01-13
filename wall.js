class Wall {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  changeVelocity(velocity) {
    velocity.negateX();
  }
}