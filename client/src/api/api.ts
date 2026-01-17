import axios from "axios";
import type { Expense } from "../types/Expense";


const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

export async function createExpense(
  payload: Omit<Expense, "id" | "created_at">,
  idempotencyKey: string
): Promise<Expense> {
  const res = await api.post("/expenses", payload, {
    headers: {
      "Idempotency-Key": idempotencyKey
    }
  });
  return res.data;
}

export async function getExpenses(
  category?: string,
  sortDesc?: boolean
): Promise<Expense[]> {
  const params: any = {};
  if (category) params.category = category;
  if (sortDesc) params.sort = "date_desc";

  const res = await api.get("/expenses", { params });
  return res.data;
}
