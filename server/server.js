const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");

const app = express();
app.use(express.json());

app.post("/expenses", (req, res) => {
  const { amount, category, description, date } = req.body;
  const idempotencyKey = req.header("Idempotency-Key");

  if (
    typeof amount !== "number" ||
    amount <= 0 ||
    !category ||
    !date ||
    !idempotencyKey
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // 1. Check idempotency
  db.get(
    "SELECT * FROM expenses WHERE idempotency_key = ?",
    [idempotencyKey],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: "DB error" });
      }

      if (row) {
        return res.status(200).json({
          ...row,
          amount: row.amount_cents / 100
        });
      }

      // 2. Insert new expense
      const expense = {
        id: uuidv4(),
        amount_cents: Math.round(amount * 100),
        category,
        description: description || "",
        date,
        created_at: new Date().toISOString(),
        idempotency_key: idempotencyKey
      };

      db.run(
        `
        INSERT INTO expenses
        (id, amount_cents, category, description, date, created_at, idempotency_key)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          expense.id,
          expense.amount_cents,
          expense.category,
          expense.description,
          expense.date,
          expense.created_at,
          expense.idempotency_key
        ],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Insert failed" });
          }

          res.status(201).json({
            ...expense,
            amount: expense.amount_cents / 100
          });
        }
      );
    }
  );
});


/**
 * GET /expenses
 * Optional query params:
 * - category
 * - sort=date_desc
 */
app.get("/expenses", (req, res) => {
  const { category, sort } = req.query;

  let query = "SELECT * FROM expenses";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }

    const formatted = rows.map(r => ({
      ...r,
      amount: r.amount_cents / 100
    }));

    res.json(formatted);
  });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

