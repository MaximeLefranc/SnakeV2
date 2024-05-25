import './style.scss';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let direction = 'e';
const gridElt = 20;
const snake = [
  [18, 18],
  [17, 18],
  [16, 18],
];
const apple = [10, 10];

const drawMap = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
  ctx.fillStyle = 'green';
  for (const body of snake) {
    ctx.fillRect(body[0] * gridElt, body[1] * gridElt, gridElt, gridElt);
  }
};

const drawApple = () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(apple[0] * gridElt, apple[1] * gridElt, gridElt, gridElt);
};

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case 'e': {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case 'o': {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case 'n': {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case 's': {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }
  snake.unshift(head);
  snake.pop();
};

const move = () => {
  updateSnakePosition();
  drawMap();
  drawSnake();
  drawApple();
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 1000);
};

requestAnimationFrame(move);
