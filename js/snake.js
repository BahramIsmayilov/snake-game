import {
 getInputDirection
} from "./input.js";

export let SNAKE_SPEED = 5;
const snakeBody = [{
 x: 12,
 y: 12
}]
let newSegments = 0;

// game point
let point = 0;

// snake fast speed
window.addEventListener("keydown", k => {
 if (k.repeat) return
 if (k.key === "Shift") {
  return SNAKE_SPEED = 20;
 }
})

// snake normal speed
window.addEventListener("keyup", k => {
 if (k.key === "Shift") {
  return SNAKE_SPEED = 5;
 }
})

export function update() {
 addSegments();
 const inputDirection = getInputDirection();
 for (let i = snakeBody.length - 2; i >= 0; i--) {
  snakeBody[i + 1] = {
   ...snakeBody[i]
  }
 }
 snakeBody[0].x += inputDirection.x;
 snakeBody[0].y += inputDirection.y;

}

export function draw(gameBoard) {
 snakeBody.forEach(segment => {
  const snakeElement = document.createElement("div")
  snakeElement.style.gridRowStart = segment.y;
  snakeElement.style.gridColumnStart = segment.x;
  snakeElement.classList.add("snake");
  gameBoard.appendChild(snakeElement);
 })
}

export function expandSnake(amount) {
 newSegments += amount;
}

export function onSnake(position, {
 ignoreHead = false
} = {}) {
 return snakeBody.some((segment, index) => {
  if (ignoreHead && index === 0) return false;
  return equalPositions(segment, position);
 })
}

export function getSnakeHead() {
 return snakeBody[0];
}

export function snakeIntersection() {
 return onSnake(snakeBody[0], {
  ignoreHead: true
 })
}

function equalPositions(pos1, pos2) {
 if (pos1.x === pos2.x && pos1.y === pos2.y) {
  point++;
  document.getElementById("point").innerHTML = point;
 }
 return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
 for (let i = 0; i < newSegments; i++) {
  snakeBody[snakeBody.length] = {
   ...snakeBody[snakeBody.length - 1]
  }
 }
 newSegments = 0
}