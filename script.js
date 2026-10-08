/* QuickNotes - script.js */

const STORAGE_KEY = "quicknotes";

let notes = [];

// Load saved notes when the page opens
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      notes = JSON.parse(saved);
    } catch {
      notes = [];
    }
  }
}

// Save notes whenever they change
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Build one note card using createElement and textContent (never innerHTML)
function buildNoteCard(note) {
  const li = document.createElement("li");
  li.className = "note-card category-" + note.category.toLowerCase();

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const label = document.createElement("span");
  label.className = "category-label category-" + note.category.toLowerCase();
  label.textContent = note.category;

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn-delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    notes = notes.filter(function (n) {
      return n.id !== note.id;
    });
    saveNotes();
    render();
  });

  meta.appendChild(label);
  meta.appendChild(date);
  meta.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(meta);

  return li;
}

function updateCount(filtered) {
  const countEl = document.getElementById("note-count");
  if (filtered.length === 0) {
    countEl.textContent = "You have no notes yet.";
  } else if (filtered.length === 1) {
    countEl.textContent = "You have 1 note.";
  } else {
    countEl.textContent = "You have " + filtered.length + " notes.";
  }
}

function render() {
  const list = document.getElementById("notes-list");
  const search = document.getElementById("search-input").value.trim().toLowerCase();

  const filtered = notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });

  // Clear the list
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (filtered.length === 0 && search !== "") {
    const li = document.createElement("li");
    li.className = "no-notes";
    li.textContent = "No notes match your search.";
    list.appendChild(li);
  } else {
    filtered.forEach(function (note) {
      list.appendChild(buildNoteCard(note));
    });
  }

  updateCount(filtered);
}

function formatDate(date) {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Form submit: validate, add note, re-render
document.getElementById("note-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("note-input");
  const category = document.getElementById("category-select").value;
  const error = document.getElementById("error-message");
  const text = input.value.trim();

  if (text === "") {
    error.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    error.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  error.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: formatDate(new Date())
  };

  notes.push(note);
  saveNotes();
  input.value = "";
  render();
  input.focus();
});

// Live search as the user types
document.getElementById("search-input").addEventListener("input", render);

// Bonus: Clear all with confirmation
document.getElementById("clear-all").addEventListener("click", function () {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

loadNotes();
render();
