# ✅ Get Things Done — React Task Manager

A task manager built with React and Vite, focused on actually being pleasant to use day-to-day — not just a checklist that stores text.

## Live Demo

_Add your Vercel link here once deployed._

## Features

- **Add, complete, and delete tasks**, with an "Enter" keyboard shortcut for quickly adding without reaching for the mouse
- **Drag-and-drop reordering** — manually prioritize your list by dragging tasks into the order that matters to you
- **Categories** (Personal, Work, Urgent, Other), each shown as a color-coded tag on every task
- **Due dates**, with automatic overdue highlighting — a task past its date turns red with a warning icon, as long as it isn't already completed
- **Search and filter** — search by task text, filter by category and/or due date, all tucked behind a collapsible "Filters" panel so the main view stays clean when you're not using them
- **"Delete Completed"** — clear every checked-off task in one click instead of deleting them one by one
- **Dark/light theme toggle**, remembered across visits
- **A running counter** ("3 of 7 completed") so you can see progress at a glance
- **Smooth add/remove animations** via Framer Motion, so tasks feel like they belong on the page rather than snapping in and out
- **Persists everything** in your browser's local storage — refresh, close the tab, come back tomorrow, your list is still there

## Tech Stack

- React (Vite, plain JavaScript — no TypeScript)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop
- [Framer Motion](https://www.framer.com/motion/) for enter/exit animations
- Plain CSS with custom properties (variables) driving the dark/light theme — no CSS framework

## Running It Locally

```bash
git clone https://github.com/ayomideomosaiye-cyber/react-tasker.git
cd react-tasker
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## How to Use It

1. Type a task into the text box, optionally pick a category and a due date, then hit **Enter** or click **Add**.
2. Click a task's checkbox to mark it complete — its text fades and gets struck through.
3. Drag a task by clicking and holding it, then dropping it into a new position to reorder your list.
4. Once you have tasks, a search bar and a **Filters** button appear — use them to narrow the list by text, category, or a specific due date.
5. Click **Delete Completed** to clear every checked-off task at once.
6. Click the sun/moon icon in the corner to switch between dark and light mode — your choice is remembered next time you visit.

## What's Not Built (Yet)

This is a portfolio project, not a finished product — there's no account system or cloud sync, so tasks are tied to whichever browser you're using, not to "you" across devices. That's a deliberate scope decision: the goal here was a genuinely complete, polished single-user experience first, rather than a shallow version of something bigger.

## Possible Future Additions

- Inline editing (currently you'd delete and re-add a task to fix a typo)
- Subtasks/checklists within a task
- Syncing across devices via a real backend
