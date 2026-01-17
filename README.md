# Expense Tracker - Full Stack 

This project is a minimal full-stack Expense Tracker that allows users to record and review personal expenses.
It is designed to behave correctly under real-world conditions such as retries, page refreshes, and slow or failed network requests.

The focus of this implementation is data correctness, robustness, and clear structure, rather than feature bloat or heavy styling.

# Features Backend

Create a new expense with:

- amount

- category

- description

- date

- List expenses

- Filter expenses by category

- Sort expenses by date (newest first)

- Safe handling of duplicate requests (idempotency)

- Durable persistence using SQLite

# Frontend

- Form to add a new expense

- Table view of existing expenses

- Filter by category

- Sort by date (toggle newest / oldest)

- Display total amount of currently visible expenses

Handles:

- Multiple submit clicks

- Page refresh after submit

- Slow or failed API responses

- Basic validation and user feedback (toasts, loading states)

# Tech Stack
# Backend

- Node.js

- Express

- SQLite (sqlite3)

- UUID (for expense IDs and idempotency keys)

# Frontend

- React (Vite)

- TypeScript

- Axios

- Tailwind CSS

- react-hot-toast

# Key Design Decisions

- Used idempotency keys on expense creation to prevent duplicates during retries, refreshes, or multiple submits.

- Stored money as integer cents in the database to avoid floating-point precision issues.

- Chose SQLite for simple, durable persistence without external dependencies.

- Handled filtering and sorting on the backend for consistent behavior across refreshes.

# Trade-offs (Timeboxed)

- Skipped pagination and performance optimizations assuming a small dataset.

- Kept UI styling minimal to focus on correctness and clarity.

- Did not add automated tests to prioritize core functionality.

# Intentionally Not Implemented

- Authentication or multi-user support.


# Running the Project Locally
- Backend
- cd server
- npm install
- npm start
- Server runs on: http://localhost:3000

# Frontend
- cd frontend
- npm install
- npm run dev
- Frontend runs on: http://localhost:5173
