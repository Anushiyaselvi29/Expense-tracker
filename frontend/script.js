// script.js - Frontend logic for Expense Tracker
// Talks to backend running at http://localhost:5000

const API_URL = "http://localhost:5000/api/expenses";

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

// Fetch and display all expenses
async function loadExpenses() {
  try {
    const res = await fetch(API_URL);
    const expenses = await res.json();
    renderExpenses(expenses);
  } catch (err) {
    console.error("Error loading expenses:", err);
    list.innerHTML = "<li>⚠️ Could not connect to backend. Is server.js running?</li>";
  }
}

// Render expenses to the page
function renderExpenses(expenses) {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.title} (${exp.category}) - ₹${exp.amount} <small>${exp.date}</small></span>
      <button class="delete-btn" data-id="${exp.id}">Delete</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = total;
}

// Add new expense
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category, date }),
    });

    form.reset();
    loadExpenses();
  } catch (err) {
    console.error("Error adding expense:", err);
  }
});

// Delete expense
list.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }
});

// Initial load
loadExpenses();
