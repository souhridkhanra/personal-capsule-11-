let events = [];

// Load events when page opens
window.onload = function () {
  loadEvents();
  renderEvents();
};

// Add event
function addEvent() {
  const input = document.getElementById("eventInput");
  const value = input.value.trim();

  if (value === "") {
    alert("Please enter an event!");
    return;
  }

  events.push(value);
  input.value = "";

  saveEvents();
  renderEvents();
}

// Render events on screen
function renderEvents() {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  // Empty state UI
  if (events.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No events added yet 📭";
    emptyItem.style.textAlign = "center";
    emptyItem.style.color = "#777";
    list.appendChild(emptyItem);
    return;
  }

  // Render each event
  events.forEach((event, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = event;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => deleteEvent(index);

    li.appendChild(span);
    li.appendChild(btn);

    list.appendChild(li);
  });
}

// Delete event
function deleteEvent(index) {
  events.splice(index, 1);
  saveEvents();
  renderEvents();
}

// Save to localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

// Load from localStorage
function loadEvents() {
  const stored = localStorage.getItem("events");

  if (stored) {
    events = JSON.parse(stored);
  }
}