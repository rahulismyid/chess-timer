function createTimer(element, initialMinutes, initialSeconds, player) {
  // Initialize variables to track timer state
  let min = initialMinutes;
  let sec = initialSeconds;
  let ms = 0;
  let timerInterval = null; // Holds the setInterval reference
  let paused = false; // Flag to track if timer is paused
  let remainingTime = min * 60 + sec; // Total remaining time in seconds

  // Function to start the timer
  const start = () => {
    // Check if the timer is not already running and not paused
    if (timerInterval === null && !paused) {
      // Start the timer interval
      timerInterval = setInterval(tick, 100); // Update every second
    }
    paused = false; // Reset paused flag
  };

  const tick = () => {
    // Check if time is up
    if (min === 0 && sec === 0 && ms === 0) {
      clearInterval(timerInterval); // Clear the interval
      onTimerEnd(player);
      return element.innerHTML; // Exit the function
    }

    // Update msonds
    if (sec === 0 && min === 0 && ms === 0) {
      ms = 9; // Reset msonds to 9
    } else if (ms === 0) {
      ms = 9; // Reset msonds to 9
      // Update seconds and minutes if msonds reach 0
      if (sec === 0 && min > 0) {
        min--; // Decrement minutes
        sec = 59; // Reset seconds
      } else if (sec > 0) {
        sec--; // Decrement seconds
      }
    } else {
      ms--; // Decrement msonds
    }

    remainingTime--; // Update total remaining time

    // Update the HTML content of the timer element
    element.innerHTML = formatTime(min, sec, ms);
  };

  // Function to pause the timer
  const pause = () => {
    clearInterval(timerInterval); // Clear the interval
    timerInterval = null; // Reset timer interval reference
    paused = true; // Set paused flag to true
  };

  // Function to resume the timer
  const resume = () => {
    // Check if the timer is paused
    if (paused) {
      // Resume the timer interval
      timerInterval = setInterval(tick, 100); // Update every second
      paused = false; // Reset paused flag
    }
  };

  // Function to stop the timer
  const stop = () => {
    clearInterval(timerInterval); // Clear the interval
    timerInterval = null; // Reset timer interval reference
  };

  // Function to format minutes and seconds into MM:SS format
  const formatTime = (minutes, seconds) => {
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}:${ms}`;
  };

  // Return an object with public methods
  return { start, pause, resume, stop };
}
