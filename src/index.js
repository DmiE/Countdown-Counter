const counterDays = document.querySelector("#counter__days");
const counterHours = document.querySelector("#counter__hours");
const counterMinutes = document.querySelector("#counter__minutes");
const counterSeconds = document.querySelector("#counter__seconds");
const eventDate = "January 14, 2020 18:04:00";
let previouseTime = {
  days: {
    value: 0,
    maxValue: 7
  },
  hours: {
    value: 0,
    maxValue: 23
  },
  minutes: {
    value: 0,
    maxValue: 59
  },
  seconds: {
    value: 0,
    maxValue: 59
  }
};

const calculateTimeToDate = dateOfEvent => {
  const timeOfEvent = Date.parse(dateOfEvent);
  const acctualTime = Date.now();
  const timeToEvent = timeOfEvent - acctualTime;

  const days = Math.floor(timeToEvent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeToEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeToEvent % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeToEvent % (1000 * 60)) / 1000);

  return {
    days: {
      value: days,
      maxValue: 7
    },
    hours: {
      value: hours,
      maxValue: 24
    },
    minutes: {
      value: minutes,
      maxValue: 60
    },
    seconds: {
      value: seconds,
      maxValue: 60
    }
  };
};

const updateCountdown = time => {
  counterDays.innerHTML = time.days.value;
  counterHours.innerHTML = time.hours.value;
  counterMinutes.innerHTML = time.minutes.value;
  counterSeconds.innerHTML = time.seconds.value;

  if (time.days.value <= 0 && time.hours.value <= 0 && time.minutes.value <= 0 && time.seconds.value <= 0) {
    counterDays.innerHTML = 0;
    counterHours.innerHTML = 0;
    counterMinutes.innerHTML = 0;
    counterSeconds.innerHTML = 0;
  }
};

const setCountdownCircles = time => {
  $("#days__circle").circleProgress({
    value: time.days.value / time.days.maxValue,
    size: 80,
    fill: { color: "#fff" },
    lineCap: "round"
  });

  $("#hours__circle").circleProgress({
    value: time.hours.value / time.hours.maxValue,
    size: 80,
    fill: { color: "#fff" },
    lineCap: "round"
  });

  $("#minutes__circle").circleProgress({
    value: time.minutes.value / time.minutes.maxValue,
    size: 80,
    fill: { color: "#fff" },
    lineCap: "round"
  });

  $("#seconds__circle").circleProgress({
    value: time.seconds.value / time.seconds.maxValue,
    size: 80,
    fill: { color: "#fff" },
    lineCap: "round"
  });
};

const shouldCountdownCircleUpdate = acctualTime => {
  for (const key of Object.keys(acctualTime)) {
    if (previouseTime[key].value !== acctualTime[key].value) {
      updateCountdownCircle(
        "#" + key + "__circle",
        previouseTime[key].value,
        acctualTime[key].value,
        acctualTime[key].maxValue
      );
      previouseTime[key] = acctualTime[key];
    }
  }
};

const updateCountdownCircle = (circleObject, previousValue, acctualValue, maxValue) => {
  $(circleObject).circleProgress({ animationStartValue: previousValue / maxValue, value: acctualValue / maxValue });
};

setCountdownCircles(calculateTimeToDate(eventDate));
previouseTime = calculateTimeToDate(eventDate);

setTimeout(function() {
  const countdownInterval = setInterval(function() {
    const time = calculateTimeToDate(eventDate);
    updateCountdown(time);
    shouldCountdownCircleUpdate(time);

    if (time.seconds.value <= 0 && time.minutes.value <= 0 && time.hours.value <= 0 && time.days.value <= 0) {
      clearInterval(countdownInterval);
    }
  }, 500);
}, 500);
