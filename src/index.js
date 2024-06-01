import './style.scss';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let speed = 800;
let direction = 'e';
const gridElt = 40;
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];
let apple = [10, 10];
let score = 0;

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

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight': {
      direction = 'e';
      break;
    }
    case 'ArrowLeft': {
      direction = 'w';
      break;
    }
    case 'ArrowUp': {
      direction = 'n';
      break;
    }
    case 'ArrowDown': {
      direction = 's';
      break;
    }
  }
});

const gameOver = () => {
  if (
    snake[0][0] > 19 ||
    snake[0][0] < 0 ||
    snake[0][1] > 19 ||
    snake[0][1] < 0
  ) {
    return true;
  } else {
    const [head, ...body] = snake;

    for (const bodyElt of body) {
      if (bodyElt[0] === head[0] && bodyElt[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
};

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case 'e': {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case 'w': {
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
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
  } else {
    snake.pop();
  }
  return gameOver();
};

const generateApple = () => {
  const [x, y] = [
    Math.trunc(Math.random() * 19),
    Math.trunc(Math.random() * 19),
  ];
  for (const bodyElt of snake) {
    if (bodyElt[0] === x && bodyElt[1] === y) {
      return generateApple();
    }
  }
  score++;
  apple = [x, y];
};

const drawScore = () => {
  ctx.fillStyle = 'white';
  ctx.font = '40px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText(score, gridElt, gridElt);
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - speed);
  } else {
    alert(`Perdu, votre score est: ${score}`);
  }
};

requestAnimationFrame(move);
