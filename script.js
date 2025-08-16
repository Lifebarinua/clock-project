// Track format for each clock separately
let simple24Hour = true;
let fancy24Hour = true;

// Calendar state trackers
let simpleMonthOffset = 0;
let fancyMonthOffset = 0;

function formatTime(date, is24Hour) {
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');

  if (is24Hour) {
    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  } else {
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  }
}

function formatDate(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function updateClock() {
  const now = new Date();
  document.getElementById('simple-clock').textContent = formatTime(now, simple24Hour);
  document.getElementById('simple-date').textContent = formatDate(now);

  document.getElementById('fancy-clock').textContent = formatTime(now, fancy24Hour);
  document.getElementById('fancy-date').textContent = formatDate(now);
}
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

// Calendar generator with month offset
function generateCalendar(containerId, monthOffset = 0) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + monthOffset;
  const displayDate = new Date(year, month, 1);

  const displayYear = displayDate.getFullYear();
  const displayMonth = displayDate.getMonth();
  const today = now.getDate();
  const isCurrentMonth = (displayYear === now.getFullYear() && displayMonth === now.getMonth());

  const firstDay = new Date(displayYear, displayMonth, 1).getDay();
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  let calendar = `
    <div class="scroll-controls">
      <button class="prev">↑ Prev</button>
      <span>${displayDate.toLocaleString('default', { month: 'long' })} ${displayYear}</span>
      <button class="next">↓ Next</button>
    </div>
    <table>
    <thead>
      <tr>
        <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
      </tr>
    </thead>
    <tbody><tr>`;

  for (let i = 0; i < firstDay; i++) {
    calendar += "<td></td>";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(displayYear, displayMonth, day).getDay();
    const isToday = (day === today && isCurrentMonth) ? "today" : "";
    calendar += `<td class="${isToday}">${day}</td>`;
    if (currentDay === 6 && day !== daysInMonth) {
      calendar += "</tr><tr>";
    }
  }

  calendar += "</tr></tbody></table>";
  document.getElementById(containerId).innerHTML = calendar;

  // Add event listeners for scroll buttons
  const container = document.getElementById(containerId);
  container.querySelector(".prev").addEventListener("click", () => {
    if (containerId === "simple-calendar") {
      simpleMonthOffset--;
      generateCalendar(containerId, simpleMonthOffset);
    } else {
      fancyMonthOffset--;
      generateCalendar(containerId, fancyMonthOffset);
    }
  });
  container.querySelector(".next").addEventListener("click", () => {
    if (containerId === "simple-calendar") {
      simpleMonthOffset++;
      generateCalendar(containerId, simpleMonthOffset);
    } else {
      fancyMonthOffset++;
      generateCalendar(containerId, fancyMonthOffset);
    }
  });
}

// Toggle calendar show/hide
function toggleCalendar(btnId, calendarId, offsetVar) {
  const btn = document.getElementById(btnId);
  const cal = document.getElementById(calendarId);

  btn.addEventListener("click", () => {
    if (cal.style.display === "block") {
      cal.style.display = "none";
      btn.textContent = "Show Calendar";
    } else {
      generateCalendar(calendarId, offsetVar === "simple" ? simpleMonthOffset : fancyMonthOffset);
      cal.style.display = "block";
      btn.textContent = "Hide Calendar";
    }
  });
}
toggleCalendar("simple-calendar-btn", "simple-calendar", "simple");
toggleCalendar("fancy-calendar-btn", "fancy-calendar", "fancy");
