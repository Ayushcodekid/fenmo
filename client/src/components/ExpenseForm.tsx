import { useState } from "react";
import { createExpense } from "../api/api";
import toast from "react-hot-toast";

interface Props {
  onCreated: () => void;
}

export default function ExpenseForm({ onCreated }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation with toasts
    if (!amount || Number(amount) <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    setLoading(true);
    const idempotencyKey = crypto.randomUUID();

    try {
      await createExpense(
        { amount: Number(amount), category, description, date },
        idempotencyKey,
      );

      toast.success("Expense added");

      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      onCreated();
    } catch {
      toast.error("Failed to save expense. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Amount */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Amount (₹)
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Category
        </label>
        <input
          placeholder="Select category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <input
          placeholder="What was this expense for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Date */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Button */}
      <div className="md:col-span-2">
        <button
          disabled={loading}
          className="rounded-md bg-slate-900 px-6 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
