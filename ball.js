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