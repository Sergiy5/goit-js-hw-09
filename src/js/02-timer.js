import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
    return  window.alert('Pleas choose date in the future');
    }
    btnStart.disabled = false;

    const timer = {
      isActive: false,
      intervalId: null,
      start() {
        if (this.isActive) {
          return;
        }
        const startTime = selectedDates[0];
        this.isActive = true;
        this.intervalId = setInterval(() => {
          btnStart.disabled = true;
          const currentTime = Date.now()
          const deltaTime = startTime - currentTime;
          
          if (deltaTime < 1000) {
            clearInterval(this.intervalId);
          };

          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          
          daysData.textContent = days;
          hoursData.textContent = hours;
          minutesData.textContent = minutes;
          secondsData.textContent = seconds;
        }, 1000);
      },      
    };

    btnStart.addEventListener('click', () => {timer.start()})
    
   
    // Функція яка додає 0 перед одиничним числом
    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = addLeadingZero(Math.floor(ms / day));      
      const hours = addLeadingZero(Math.floor((ms % day) / hour));      
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));      
      const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      return { days, hours, minutes, seconds };
    }
      console.dir(selectedDates[0]);
  },
};

flatpickr(myInput, options);

