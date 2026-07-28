// server.js - Expense Tracker Backend (Node.js + Express)
// Simple JSON file used as database - no MongoDB/MySQL setup needed.

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "expenses.json");

app.use(cors());
app.use(express.json());

// Helper: read expenses from file
function readExpenses() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data || "[]");
}

// Helper: write expenses to file
function writeExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// GET all expenses
app.get("/api/expenses", (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// POST a new expense
app.post("/api/expenses", (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: "Title and amount are required" });
  }

  const expenses = readExpenses();
  const newExpense = {
    id: Date.now().toString(),
    title,
    amount: Number(amount),
    category: category || "General",
    date: date || new Date().toISOString().split("T")[0],
  };

  expenses.push(newExpense);
  writeExpenses(expenses);

  res.status(201).json(newExpense);
});

// DELETE an expense by id
app.delete("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  let expenses = readExpenses();
  const exists = expenses.some((exp) => exp.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Expense not found" });
  }

  expenses = expenses.filter((exp) => exp.id !== id);
  writeExpenses(expenses);

  res.json({ message: "Expense deleted successfully" });
});

// Health check route (useful for DevOps deployment checks)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Expense Tracker backend is running" });
});

app.listen(PORT, () => {
  console.log(`Expense Tracker backend running on http://localhost:${PORT}`);
});
