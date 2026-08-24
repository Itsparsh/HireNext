# HireNext - Project Structure Guide

This guide helps you locate the different parts of your codebase, including the frontend, backend, candidate, recruiter, and admin code.

## 🌐 1. Frontend Code (React)
Your entire frontend React application is located in the `src` folder. This includes all the visual components, styling, and logic that the user interacts with in the browser.

* **Location:** `src/`
* **Entry Point:** `src/main.jsx` and `src/App.jsx`
* **Styling:** `src/index.css` (global styles) and `tailwind.config.js` (Tailwind styling)
* **Components:** `src/Component/` (reusable UI elements)
* **Context (State Management):** `src/Context/`

## ⚙️ 2. Backend Code (Node.js & Express)
The entire backend server, API routes, and database models are completely separate from the frontend and are contained within the `server` folder.

* **Location:** `server/`
* **Entry Point:** `server/index.js` (This starts your server)
* **API Routes:** `server/routes/` (e.g., auth, jobs, users)
* **Database Models (MongoDB):** `server/models/` (e.g., User schema, Job schema)
* **Database Connection:** `server/db.js`

## 👨‍💻 3. Candidate Code
The pages and specific views for the Job Candidates are grouped together inside the frontend `Pages` directory.

* **Location:** `src/Pages/Candidate/`
* **Key Files Include:**
  * `CandidateDashboard.jsx` (Main candidate view)
  * `CandidateProfile.jsx` (Profile editing)
  * `CandidateResources.jsx` (Learning resources)
  * `CandidateJobs.jsx` (Job board)

## 🏢 4. Recruiter Code
Similarly, all the pages and specific views for Recruiters are neatly organized in their own directory.

* **Location:** `src/Pages/Recruiter/`
* **Key Files Include:**
  * `RecruiterDashboard.jsx` (Main recruiter view)
  * `RecruiterJobs.jsx` (Managing job postings)
  * `RecruiterInterviews.jsx` (Scheduling/managing interviews)
  * `RecruiterTeam.jsx` (Team management)

## 👑 5. Admin Code
*Note: Currently, there isn't a dedicated "Admin" role or folder implemented in the project yet.*

When you are ready to build the Admin dashboard, you should create the code in the following locations:

* **Frontend Admin Pages:** Create a new folder at `src/Pages/Admin/` (e.g., `AdminDashboard.jsx`, `ManageUsers.jsx`)
* **Backend Admin Routes:** Create an admin route file in `server/routes/admin.js` to handle admin-only actions (like deleting any user or approving companies).
* **Role Management:** You will need to add an `'admin'` role to your User model in `server/models/User.js`.
