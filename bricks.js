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

class Bricks {
  constructor(){
    this.list = [];
  }

  inject(brick){
    this.list.push(brick);
  }
}