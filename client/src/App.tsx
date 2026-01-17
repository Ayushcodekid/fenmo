import { useEffect, useState } from "react";
import { getExpenses } from "./api/api";
import type { Expense } from "./types/Expense";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [sortDesc, setSortDesc] = useState(false);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getExpenses(category, sortDesc);
    setExpenses(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [category, sortDesc]);

  const categories = [...new Set(expenses.map((e) => e.category))];

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-slate-50 px-6 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Expense Tracker</h1>
          <p className="mt-2 text-slate-500">
            Track and manage your daily expenses
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-8">
          {/* Add Expense Card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Add Expense</h2>
            <ExpenseForm onCreated={load} />
          </div>

          {/* Expenses Card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Expenses</h2>

              <Filters
                categories={categories}
                selected={category}
                sortDesc={sortDesc}
                onChange={setCategory}
                onSort={() => setSortDesc((prev) => !prev)}
              />
            </div>

            {loading ? (
              <p className="py-10 text-center text-slate-500">
                Loading expenses…
              </p>
            ) : expenses.length === 0 ? (
              <p className="py-16 text-center text-slate-500">
                No expenses yet. Add your first expense above!
              </p>
            ) : (
              <ExpenseList expenses={expenses} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
