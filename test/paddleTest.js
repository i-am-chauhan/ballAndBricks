describe('paddle', () => {
  describe('moveLeft', () => {
    const paddle = new Paddle(20, 30, new Position(30, 40), 10);
    it('should decrement the paddle position.X by 10', () => {
      paddle.moveLeft();
      chai.assert.equal(20, paddle.position.X);
    });
  });
  describe('moveRight', () => {
    const paddle = new Paddle(20, 30, new Position(30, 40), 10);
    it('should increament the paddle position.X by 10', () => {
      paddle.moveRight();
      chai.assert.equal(40, paddle.position.X);
    });
  });
});