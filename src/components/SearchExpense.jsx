import { useExpenseStore } from "../store/expenseStore";
import { EXPENSE_CATEGORIES } from "../constants/categories";

const SearchExpense = () => {
  const searchTerm = useExpenseStore((state) => state.searchTerm);
  const setSearchTerm = useExpenseStore((state) => state.setSearchTerm);

  const categoryFilter = useExpenseStore((state) => state.categoryFilter);
  const setCategoryFilter = useExpenseStore((state) => state.setCategoryFilter);

  const theme = useExpenseStore((state) => state.theme);
  const isDark = theme === "dark";

  // ✅ THEME STYLES
  const inputStyle = isDark
    ? "bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400";

  const selectStyle = isDark
    ? "bg-slate-900/80 border-slate-700 text-white"
    : "bg-white border-slate-300 text-slate-900";

  const arrowColor = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <div className="flex gap-3">
      {/* ✅ SEARCH INPUT */}
      <input
        className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${inputStyle}`}
        type="text"
        placeholder="Search expense..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ✅ CATEGORY FILTER */}
      <div className="relative w-32">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`h-10.5 w-full cursor-pointer appearance-none rounded-xl border px-4 text-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${selectStyle}`}
        >
          <option value="">All</option>

          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.emoji} {cat.value}
            </option>
          ))}
        </select>

        {/* ✅ ARROW */}
        <div
          className={`pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs ${arrowColor}`}
        >
          ▼
        </div>
      </div>
    </div>
  );
};

export default SearchExpense;
