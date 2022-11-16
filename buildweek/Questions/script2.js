// timer js
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 0;
const ALERT_THRESHOLD = 0;

const COLOR_CODES = {
    step1: {
        color: "a"
    },
    step2: {
        color: "b",
        threshold: WARNING_THRESHOLD
    },
    step3: {
        color: "c",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.step1.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45, 45 0 1,0 90,0
          a  45, 45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time; 
    console.log(seconds);
    
    
    return `<p>SECONDS</p><p><b>${seconds}</b></p><p>REMAINING</p>`;
}


function setRemainingPathColor(timeLeft) {
    const { step3, step2, step1 } = COLOR_CODES;
    if (timeLeft <= step3.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(step1.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(step3.color);
    } else if (timeLeft <= step2.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(step1.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(step2.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}
