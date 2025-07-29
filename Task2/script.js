 let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;
let isRunning = false;
let startButton = document.getElementById("startStopBtn"); // safer selector

function updateTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  display.innerText = `${h}:${m}:${s}`; // ✅ fixed template literal syntax
}

function startStop() {
  if (!isRunning) {
    timer = setInterval(updateTime, 1000);
    isRunning = true;
    startButton.innerText = "Pause"; // ✅ changed button text
  } else {
    clearInterval(timer);
    isRunning = false;
    startButton.innerText = "Start";
  }
}

function reset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  display.innerText = "00:00:00";
  startButton.innerText = "Start";
  isRunning = false;
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = display.innerText;
    const lapItem = document.createElement("li");
    lapItem.innerText = `Lap: ${lapTime}`; // ✅ fixed template string
    document.getElementById("laps").appendChild(lapItem);
  }
}

// Attach listener if not using inline onclick
startButton.addEventListener("click", startStop);
