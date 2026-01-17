import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b last:border-0">
                <td className="px-3 py-2">{e.date}</td>
                <td className="px-3 py-2">{e.category}</td>
                <td className="px-3 py-2">{e.description}</td>
                <td className="px-3 py-2 text-right font-medium">
                  ₹{e.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-lg font-medium">
        Total: ₹{total.toFixed(2)}
      </div>
    </>
  );
}
