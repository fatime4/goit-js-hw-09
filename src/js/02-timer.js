import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute('disabled', 'disabled');

let deadline = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      console.log(selectedDates[0]);
      deadline = selectedDates[0].getTime();
    }
  },
};

flatpickr(inputEl, options);

const timer = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      console.log(deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      document.querySelector('span[data-days]').textContent =
        this.addLeadingZero(days);
      document.querySelector('span[data-hours]').textContent =
        this.addLeadingZero(hours);
      document.querySelector('span[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      document.querySelector('span[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
});
