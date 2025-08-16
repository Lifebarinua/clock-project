// Track format for each clock separately
let simple24Hour = true;
let fancy24Hour = true;

function formatTime(date, is24Hour) {
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');

  if (is24Hour) {
    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  } else {
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour
    return `${hours}:${minutes}:${seconds} ${period}`;
  }
}

function updateClock() {
  const now = new Date();

  // Update simple clock
  document.getElementById('simple-clock').textContent = formatTime(now, simple24Hour);

  // Update fancy clock
  document.getElementById('fancy-clock').textContent = formatTime(now, fancy24Hour);
}

// Run immediately and update every second
updateClock();
setInterval(updateClock, 1000);

// Toggle buttons
document.getElementById('simple-toggle').addEventListener('click', () => {
  simple24Hour = !simple24Hour;
  document.getElementById('simple-toggle').textContent = simple24Hour
    ? "Switch to 12-hour"
    : "Switch to 24-hour";
});

document.getElementById('fancy-toggle').addEventListener('click', () => {
  fancy24Hour = !fancy24Hour;
  document.getElementById('fancy-toggle').textContent = fancy24Hour
    ? "Switch to 12-hour"
    : "Switch to 24-hour";
});
