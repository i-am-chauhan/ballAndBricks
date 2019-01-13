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