const timerEl = document.querySelector('.timer');
// const daysEl = document.querySelector('span[data-days]');
// const hoursEl = document.querySelector('span[data-hours]');
// const minEl = document.querySelector('span[data-minutes]');
// const secEl = document.querySelector('span[data-seconds]');

onStartBtnClick = () => {
  IntervalId = setInterval(() => {
    const now = Date.now();
    const diff = deadline - now;
    console.log(diff);
    if (diff <= 0) {
      clearInterval(IntervalId);
      return;
    }
  });
};

startBtn.addEventListener('click', onStartBtnClick(deadline));

const timer = {
  intervalId: null,

  start(rootSelector, deadline) {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const diff = deadline - now;

      if (diff <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      rootSelector.querySelector('span[data-days]').textContent =
        this.addLeadingZero(days);
      rootSelector.querySelector('span[data-hours]').textContent =
        this.addLeadingZero(hours);
      rootSelector.querySelector('span[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      rootSelector.querySelector('span[data-seconds]').textContent =
        this.addLeadingZero(seconds);

      // daysEl.textContent = this.addLeadingZero(days);
      // hoursEl.textContent = this.addLeadingZero(hours);
      // minEl.textContent = this.addLeadingZero(minutes);
      // secEl.textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
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
};

timer.start(timerEl, deadline);

// startBtn.addEventListener('click', timer.start());
// startBtn.addEventListener('click', timer.start(deadline));
