let inputDirection = {
  x: 0,
  y: 0,
};
let lastInputDirection = {
  x: 0,
  y: 0,
};
window.addEventListener("keydown", (k) => {
  switch (k.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: -1,
      };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: 1,
      };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: -1,
        y: 0,
      };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: 1,
        y: 0,
      };
      break;
  }
});

// for swipe handling
window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      // if (xDiff > 0 && lastInputDirection.x === 0) {
      if (lastInputDirection.x !== 0) return;
      /* left swipe */
      inputDirection = {
        x: -1,
        y: 0,
      };
    } else if (xDiff < 0) {
      // } else if (xDiff < 0 && lastInputDirection.x === 0) {
      if (lastInputDirection.x !== 0) return;
      /* right swipe */
      inputDirection = {
        x: 1,
        y: 0,
      };
    }
  } else {
    if (yDiff > 0) {
      // if (yDiff > 0 && lastInputDirection.y === 0) {
      if (lastInputDirection.y !== 0) return;
      /* up swipe */
      inputDirection = {
        x: 0,
        y: -1,
      };
    } else if (yDiff < 0) {
      // } else if (yDiff < 0 && lastInputDirection.y === 0) {
      if (lastInputDirection.y !== 0) return;
      /* down swipe */
      inputDirection = {
        x: 0,
        y: 1,
      };
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
