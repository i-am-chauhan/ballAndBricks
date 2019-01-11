const createPaddleDiv = function(document){
  let div = document.createElement('div');
  div.id = 'paddle_1';
  div.className = 'paddle';
  return div;
}

const applyPixel = (count) => count + "px";

const drawPaddle = function(document, paddle){
  const paddleDiv = document.getElementById('paddle_1');
  paddleDiv.style.height = applyPixel(paddle.height);
  paddleDiv.style.width = applyPixel(paddle.width);
  paddleDiv.style.left = applyPixel(paddle.left);
  paddleDiv.style.bottom = applyPixel(paddle.bottom);
}

const move = function(document,paddle){
  console.log(event);
  if(event.key == "ArrowRight") paddle.moveRight();
  if(event.key == "ArrowLeft") paddle.moveLeft();
  drawPaddle(document, paddle);
}

const initialise = function(){
  const paddle = new Paddle(20, 100, 350, 1, 15);
  const paddleDiv = createPaddleDiv(document);
  let screen = document.getElementById('screen');
  screen.appendChild(paddleDiv);
  drawPaddle(document, paddle);
  screen.onkeydown = move.bind(null, document, paddle);
}

window.onload = initialise;