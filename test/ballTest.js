describe('ball', () => {
  describe('moveBall', () => {
    const ball = new Ball(20, new Position(30, 40), new Velocity(10,10));
    it('should decrement the ball position X and Y by 10', () => {
      ball.moveBall();
      const expectedOutput = new Position(40, 50);
      chai.assert.deepEqual(expectedOutput, ball.position);
    });
  });
  describe('moveBall', () => {
    const ball = new Ball(20, new Position(30, 40), new Velocity(-10,-10));
    it('should increament the ball position X and Y by 10', () => {
      ball.moveBall();
      const expectedOutput = new Position(20, 30);
      chai.assert.deepEqual(expectedOutput, ball.position);
    });
  });
});