import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute('disabled', 'disabled');

let deadline = null;

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
      deadline = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

class Timer {
  #intervalId = null;

  constructor(rootSelector, deadline) {
    this.rootSelector = rootSelector;
    this.deadline = deadline;

    this.start();
  }

  start() {
    this.#intervalId = setInterval(() => {
      const now = Date.now();
      const diff = this.deadline - now;

      if (diff <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      this.rootSelector.querySelector('.value[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('.value[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('.value[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('.value[data-seconds]').textContent =
        this.addLeadingZero(seconds);

      stop() {
        clearInterval(this.#intervalId);
      }

      addLeadingZero(value) {
    return String(value).padStart(2, 0);
      }

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
  }
    });
  }
}
