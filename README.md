# QuickNotes

QuickNotes is a simple, browser-based note-taking app built from scratch with HTML, CSS and JavaScript. It lets you quickly jot down notes, tag each one with a category (Personal, Work or Study), search through your notes, and keep them all saved in your browser between visits.

## Features

- Add notes with a text input and a category dropdown (Personal, Work, Study)
- Each note shows its text, category label, creation date and a Delete button
- Live search that filters notes as you type (case-insensitive)
- Validation: empty notes and notes over 200 characters show an error message
- A count message that handles zero, one and many notes correctly
- Notes persist in localStorage, so they survive a page refresh
- "Clear all" button that asks for confirmation before deleting every note
- Colour-coded categories and a responsive layout (forms stack vertically on screens 600px or narrower)

## How to run locally

No build tools or dependencies are required.

1. Download or clone this repository.
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` (or open it with any modern web browser, e.g. `File > Open`).

That's it — the app runs entirely in the browser.

## What I learned

- How to build a dynamic UI safely with `createElement` and `textContent` instead of `innerHTML`, which prevents accidental injection of user text as HTML.
- How to persist structured data in the browser using `localStorage` together with `JSON.stringify` and `JSON.parse`, including handling the empty case when nothing has been saved yet.
- How Flexbox (and a media query) can make a form layout switch from a horizontal row to a stacked column on small screens.
- How event delegation patterns work with dynamically created elements: each Delete button gets its own click listener that filters the notes array by id, then re-renders the list.

## Project structure

- `index.html` — page structure (header, two sections, footer)
- `style.css` — styling, category colours and responsive rules
- `script.js` — add/delete/search/validation logic and localStorage persistence
- `README.md` — this file
