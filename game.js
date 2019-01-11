class Paddle {
  constructor(height, width, left, bottom, speed){
    this.height = height;
    this.width = width;
    this.left = left;
    this.bottom = bottom;
    this.speed = speed;
  }

  moveLeft(){
    this.left = this.left - this.speed;
  }

  moveRight(){
    this.left = this.left + this.speed;
  }
}