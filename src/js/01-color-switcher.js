
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body')

let timerId = null;

btnStart.addEventListener('click', coloriseBodyStart);

function coloriseBodyStart() {
  if (timerId !== 0) {
    btnStart.disabled = true;
  }
    timerId = setInterval(() => {
      const randomColor = getRandomHexColor();
      body.style.backgroundColor = randomColor;
    }, 1000);
};

btnStop.addEventListener('click', clearTimer);

function clearTimer() {
  clearInterval(timerId);
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};