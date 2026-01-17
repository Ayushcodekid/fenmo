const express = require("express");
const {
  createExpense,
  getExpenses
} = require("../controller/expenseController");

const router = express.Router();

router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);

module.exports = router;
