const GAME_TIME = 0;
const GAME_SECONDS = 60; // adding only seconds while keeping the mins to 0 would also calculate the minutes
const DEFAULT_GAME_SECONDS = GAME_SECONDS % 60;
const DEFAULT_GAME_TIME = GAME_TIME + Math.floor(GAME_SECONDS / 60);

let timer1;
let timer2;

(function () {
  renderStoppingTimer();
})();

function onTimerEnd(player = "") {
  // Stop all timers
  timer1.stop();
  timer2.stop();

  document.getElementById("tapper").style.display = "none";
  document.getElementById("timer").style.pointerEvents = "none";

  document.getElementById(
    "game-message"
  ).innerHTML = `<span class="losing-player">${
    player == "player 1" ? "Player 2" : "Player 1"
  }&nbsp;</span> won!`;

  document.getElementById("start-btn").style.display = "none";
  const resetGame = document.createElement("button");
  resetGame.id = "reset-btn";
  resetGame.classList.add("start-reset-btn");
  resetGame.textContent = "Reset";
  resetGame.addEventListener("click", function () {
    document.body.innerHTML = "";
    renderStoppingTimer();
  });
  document.getElementById("chess-timer").appendChild(resetGame);
}

function renderStoppingTimer() {
  // append title to body
  const title = document.createElement("h1");
  title.textContent = "Chess Timer";
  title.classList.add("title");

  const section = document.createElement("section");
  section.id = "chess-timer";
  section.classList.add("chess-timer-container");
  document.body.appendChild(section);

  section.appendChild(title);

  // Create a div element for the label and input field
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("input-label-container");

  // Create label element
  const label = document.createElement("label");
  label.textContent = "Time(mins): ";
  containerDiv.appendChild(label);

  // Create input field element
  let timeInput = DEFAULT_GAME_TIME;
  const timeInputField = document.createElement("input");
  timeInputField.type = "number";
  timeInputField.value = timeInput;
  timeInputField.classList.add("time-input-field");
  containerDiv.appendChild(timeInputField);

  // Append the container div to the body
  section.appendChild(containerDiv);

  const timerP1 = document.createElement("p");
  timerP1.id = "p1-time";
  timerP1.textContent = `${timeInput < 10 ? "0" + timeInput : timeInput}:${
    DEFAULT_GAME_SECONDS < 10
      ? "0" + DEFAULT_GAME_SECONDS
      : DEFAULT_GAME_SECONDS
  }:0`;

  timerP1.classList.add("time");

  const timerP2 = document.createElement("p");
  timerP2.id = "p2-time";
  timerP2.textContent = `${timeInput < 10 ? "0" + timeInput : timeInput}:${
    DEFAULT_GAME_SECONDS < 10
      ? "0" + DEFAULT_GAME_SECONDS
      : DEFAULT_GAME_SECONDS
  }:0`;

  timerP2.classList.add("time");

  // initialize timers for both players;
  timer1 = createTimer(timerP1, timeInput, DEFAULT_GAME_SECONDS, "player 1"); // Creates the first timer
  timer2 = createTimer(timerP2, timeInput, DEFAULT_GAME_SECONDS, "player 2"); // Creates the second timer

  timeInputField.addEventListener("input", (e) => {
    timeInput = e.target.value;
    timerP1.textContent =
      (e.target.value ? e.target.value : "0") +
      ":" +
      (DEFAULT_GAME_SECONDS === 0 ? "00" : DEFAULT_GAME_SECONDS);
    timerP2.textContent =
      (e.target.value ? e.target.value : "0") +
      ":" +
      (DEFAULT_GAME_SECONDS === 0 ? "00" : DEFAULT_GAME_SECONDS);

    // Update initial timer values used in timer creation
    timer1 = createTimer(timerP1, timeInput, DEFAULT_GAME_SECONDS);
    timer2 = createTimer(timerP2, timeInput, DEFAULT_GAME_SECONDS);
  });

  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  timerDiv.classList.add("timer-container");

  section.appendChild(timerDiv);

  const divPlayer1 = document.createElement("div");
  divPlayer1.id = "player1-time-container";
  const opaqueBgP1 = document.createElement("div");
  opaqueBgP1.classList.add("opaque-bg-p1");
  divPlayer1.prepend(opaqueBgP1);
  const player1Title = document.createElement("p");
  player1Title.classList.add("player1-title");
  player1Title.textContent = "Player 1";
  divPlayer1.prepend(player1Title);

  const divPlayer2 = document.createElement("div");
  divPlayer2.id = "player2-time-container";
  const opaqueBgP2 = document.createElement("div");
  opaqueBgP2.classList.add("opaque-bg-p2");
  divPlayer2.prepend(opaqueBgP2);
  const player2Title = document.createElement("p");
  player2Title.classList.add("player2-title");
  player2Title.textContent = "Player 2";
  divPlayer2.prepend(player2Title);
  divPlayer1.appendChild(timerP1);
  divPlayer2.appendChild(timerP2);

  const timeWrapper = document.createElement("div");
  timeWrapper.classList.add("time-wrapper");

  timeWrapper.appendChild(divPlayer1);
  timeWrapper.appendChild(divPlayer2);
  timerDiv.appendChild(timeWrapper);
  const tapper = document.createElement("div");
  tapper.id = "tapper";
  tapper.classList.add("tapper");
  tapper.classList.add("hide-tapper");
  timerDiv.appendChild(tapper);

  const gameMessage = document.createElement("p");
  gameMessage.id = "game-message";
  gameMessage.classList.add("message");
  section.appendChild(gameMessage);

  const startBtn = document.createElement("button");
  startBtn.id = "start-btn";
  startBtn.type = "button";
  startBtn.classList.add("start-reset-btn");
  startBtn.textContent = "Start";
  startBtn.addEventListener("click", () => {
    // if (timeInput > 0) {
    divPlayer1.addEventListener("click", () => {
      timer1.pause(); // Pause timer1
      timer2.resume(); // Start timer2
      tapper.classList.add("left");
      tapper.classList.remove("right");
      opaqueBgP2.classList.add("active");
      opaqueBgP1.classList.remove("active");
      player2Title.innerText = "Player 2 playing";
      player1Title.innerText = "Player 1";
    });

    divPlayer2.addEventListener("click", () => {
      timer2.pause(); // Pause timer2
      timer1.resume(); // Resume timer1
      tapper.classList.add("right");
      tapper.classList.remove("left");
      opaqueBgP1.classList.add("active");
      opaqueBgP2.classList.remove("active");
      player1Title.innerText = "Player 1 playing";
      player2Title.innerText = "Player 2";
    });
    player1Title.innerText = "Player 1 playing";
    player2Title.innerText = "Player 2";
    tapper.classList.add("right");
    opaqueBgP1.classList.add("active");
    opaqueBgP2.classList.remove("active");
    timer1.start();
    timer2.start();
    timer2.pause();
    isP1Playing = true;
    isP2Playing = false;
    tapper.classList.add("hide-tapper");
    startBtn.disabled = true;
    timeInputField.disabled = true;
    startBtn.style.display = "none";
    // }
  });

  section.appendChild(startBtn);
}
