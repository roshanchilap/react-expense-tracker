import { useExpenseStore } from "../store/expenseStore";

const SortExpense = () => {
  const sortBy = useExpenseStore((state) => state.sortBy);
  const setSortBy = useExpenseStore((state) => state.setSortBy);
  const theme = useExpenseStore((state) => state.theme);

  const isDark = theme === "dark";

  // ✅ THEME STYLES
  const selectStyle = isDark
    ? "bg-slate-900/80 border-slate-700 text-white"
    : "bg-white border-slate-300 text-slate-900";

  const arrowColor = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <div className="relative w-24">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`h-10.5 w-full appearance-none rounded-xl border px-3 pr-8 text-sm transition-all duration-200 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${selectStyle} `}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>
        <option value="nameAz">A-Z</option>
        <option value="nameZa">Z-A</option>
      </select>

      {/* ✅ ARROW */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm ${arrowColor}`}
      >
        ▼
      </div>
    </div>
  );
};

export default SortExpense;
