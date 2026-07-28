# Expense Tracker (DevOps Mini Project)

Simple full-stack Expense Tracker built to demonstrate a two-person Git workflow
(frontend developer + backend developer) — good fit for a DevOps course project.

- **Frontend**: Plain HTML, CSS, JavaScript (no build step, runs directly in browser)
- **Backend**: Node.js + Express, data stored in a local `expenses.json` file (no DB setup needed)

---

## 1. Folder Structure

```
expense-tracker/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── expenses.json
│   └── .gitignore
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

---

## 2. Run Locally in VS Code

### Backend
```bash
cd backend
npm install
npm start
```
This starts the API at **http://localhost:5000**
Test it: open http://localhost:5000/api/health in your browser — you should see `{"status":"OK", ...}`

### Frontend
Just open `frontend/index.html` in your browser
(or in VS Code, right-click `index.html` → "Open with Live Server" if you have the Live Server extension).

The frontend calls the backend at `http://localhost:5000`, so **keep the backend running** while using the app.

---

## 3. Git / GitHub Workflow for Two People (You = Backend, Friend = Frontend)

This is the key DevOps part — showing collaborative version control.

### Step 1: One person creates the repo and pushes the base structure
```bash
git init
git add .
git commit -m "Initial project structure with frontend and backend folders"
git branch -M main
git remote add origin https://github.com/<your-username>/Expense-tracker-.git
git push -u origin main
```

### Step 2: Both of you clone the repo
```bash
git clone https://github.com/<your-username>/Expense-tracker-.git
cd Expense-tracker-
```

### Step 3: Each person works on their own branch

**You (backend):**
```bash
git checkout -b backend-dev
# work inside backend/ folder
git add backend/
git commit -m "Add expense API endpoints"
git push origin backend-dev
```

**Your friend (frontend):**
```bash
git checkout -b frontend-dev
# work inside frontend/ folder
git add frontend/
git commit -m "Add expense tracker UI"
git push origin frontend-dev
```

### Step 4: Merge into main via Pull Requests
On GitHub:
1. Go to the repo → **Pull Requests** → **New Pull Request**
2. Select `backend-dev` → `main`, review, and **Merge**
3. Do the same for `frontend-dev` → `main`

This way both contributions show up separately in commit history — useful for
showing "collaborative development" in a DevOps project report/demo.

### Step 5: Keep branches updated (avoid conflicts)
Before starting new work each day:
```bash
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```

---

## 4. Optional DevOps Extras (if your project needs more depth)

- **CI/CD**: Add a GitHub Actions workflow (`.github/workflows/ci.yml`) to auto-run
  `npm install` on push, showing basic CI.
- **Docker**: Add a `Dockerfile` in `backend/` to containerize the API.
- **Deployment**: Deploy backend on Render/Railway and frontend on Netlify/Vercel/GitHub Pages.

Let me know if you want any of these added — happy to generate them too.
