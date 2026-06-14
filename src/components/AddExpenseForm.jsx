import { EXPENSE_CATEGORIES } from "../constants/categories";
import { useExpenseStore } from "../store/expenseStore";

const AddExpenseForm = () => {
  const editingId = useExpenseStore((state) => state.editingId);
  const expenseInput = useExpenseStore((state) => state.expenseInput);
  const setExpenseInput = useExpenseStore((state) => state.setExpenseInput);
  const expenseAmount = useExpenseStore((state) => state.expenseAmount);
  const setExpenseAmount = useExpenseStore((state) => state.setExpenseAmount);
  const closeModal = useExpenseStore((state) => state.closeModal);
  const submitExpense = useExpenseStore((state) => state.submitExpense);
  const setExpenseCategory = useExpenseStore(
    (state) => state.setExpenseCategory
  );
  const expenseCategory = useExpenseStore((state) => state.expenseCategory);
  const theme = useExpenseStore((state) => state.theme);

  const isDark = theme === "dark";

  const selectedCategory = EXPENSE_CATEGORIES.find(
    (c) => c.value === expenseCategory
  );

  // ✅ THEME STYLES (clean & scalable)
  const containerStyle = isDark
    ? "bg-slate-800/60 border border-slate-700/50"
    : "bg-white border border-slate-200";

  const inputStyle = isDark
    ? "bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400";

  const secondaryBtn = isDark
    ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
    : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200";

  return (
    <div>
      {/* Form Card */}

      <div
        className={`rounded-3xl p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 ${containerStyle}`}
      >
        <h2
          className={`mb-4 text-xl font-semibold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {editingId ? "✏️ Edit Expense" : "➕ Add Expense"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitExpense();
          }}
          className="space-y-4"
        >
          {/* ✅ Expense Name */}
          <input
            type="text"
            placeholder="Expense name..."
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${inputStyle}`}
          />

          {/* ✅ Amount */}
          <input
            type="number"
            placeholder="Amount (₹)"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${inputStyle}`}
          />

          {/* ✅ Category Select */}
          <div className="relative">
            {/* emoji */}
            <div className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-lg">
              {selectedCategory?.emoji ?? "📦"}
            </div>

            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className={`w-full cursor-pointer appearance-none rounded-xl border py-2.5 pr-10 pl-12 text-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${inputStyle}`}
            >
              <option value="" disabled>
                Select category
              </option>

              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.value}
                </option>
              ))}
            </select>

            {/* arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              ▼
            </div>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {editingId ? "✏️ Update Expense" : "➕ Add Expense"}
          </button>

          {/* ✅ Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className={`w-full rounded-xl border py-2.5 text-sm font-medium transition-all duration-200 ${secondaryBtn}`}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
