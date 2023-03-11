import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const myInput = document.querySelector('input[type = "text"]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds]');
const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      btnStart.disabled = true;
          return notifyInfo();
    };

    btnStart.addEventListener('click', () => { timer.start() });

    btnStart.disabled = false;

    const timer = {
      //isActive Для того щоб повторно не включити таймер як що кнопку не відключати
      // isActive: false,
      intervalId: null,
      start() {
        // if (this.isActive) {
        //   return;
        // }
        const startTime = selectedDates[0];
        // this.isActive = true;

        this.intervalId = setInterval(() => {
          btnStart.disabled = true;
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;

          timIsUp(deltaTime, this.intervalId);

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          daysData.textContent = days;
          hoursData.textContent = hours;
          minutesData.textContent = minutes;
          secondsData.textContent = seconds;
        }, 1000);
      },
    };
   
      console.log(selectedDates[0]);
  },
};

flatpickr(myInput, options);

// Функція яка додає 0 перед одиничним числом
    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}

// Конвертує секундиу days, hours, minutes, seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function timIsUp(time, id) {
  if (time < 1000) {
    Notify.warning('Time is up', {
      width: '150px',
      position: 'center-top',
    });
    clearInterval(id);
  }
};

function notifyInfo() {
  Notify.info('Please choose a date in the future', {
    width: '280px',
    position: 'center-top',
  });
}