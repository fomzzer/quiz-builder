# Quiz Builder

A full-stack Quiz Builder application built with Next.js (App Router), Express, TypeScript, Prisma (SQLite), and Tailwind CSS.

## Project Structure

```text
quiz-builder/
├── backend/       # Express API with Prisma & SQLite
└── frontend/      # Next.js App Router frontend with Tailwind CSS
```

---

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

---

## Environment Configuration

1. In the `backend/` folder, create a `.env` file (ensure it is **not** committed to version control):
   ```env
   PORT=5000
   DATABASE_URL="file:./dev.db"
   ```

---

## Setup & Installation

### 1. Database & Backend Setup
Open a terminal, navigate to the `backend` directory, install dependencies, set up the SQLite database, and run the server:

```bash
cd backend
npm install
npx prisma db push
npm run dev
```

The backend server will run on [http://localhost:5000](http://localhost:5000).

### 2. Frontend Setup
Open a second terminal, navigate to the `frontend` directory, install dependencies, and run the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will run on [http://localhost:3000](http://localhost:3000).

---

## How to Create a Sample Quiz

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Click on the button to create a new quiz (navigates to `/create`).
3. Enter a **Quiz Title** (e.g., *"JavaScript Basics"*).
4. Click **+ Add Question**, type your question, and select its type:
   - **True / False** (`BOOLEAN`): Choose the correct boolean answer.
   - **Text Input** (`INPUT`): Type the expected correct string answer.
   - **Checkbox Options** (`CHECKBOX`): Add multiple options and select the radio button next to the correct option.
5. Click **Save Quiz** to save it to the database. You will be redirected to the home page where your new quiz appears in the list.
