import { Pencil, Trash2 } from "lucide-react";
import { useExpenseStore } from "../store/expenseStore";
import { EXPENSE_CATEGORIES } from "../constants/categories";

const ExpenseList = () => {
  const expenseList = useExpenseStore((state) => state.expenseList);
  const startEditing = useExpenseStore((state) => state.startEditing);
  const searchTerm = useExpenseStore((state) => state.searchTerm);
  const categoryFilter = useExpenseStore((state) => state.categoryFilter);
  const openDeleteModal = useExpenseStore((state) => state.openDeleteModal);
  const sortBy = useExpenseStore((state) => state.sortBy);
  const theme = useExpenseStore((state) => state.theme);

  const isDark = theme === "dark";

  // ✅ THEME STYLES (clean & scalable)
  const containerStyle = isDark
    ? "bg-slate-800/40 border border-slate-700/30"
    : "bg-white border border-slate-200";

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";

  const rowHover = isDark ? "hover:bg-slate-900/30" : "hover:bg-slate-50";

  const iconBg = isDark ? "bg-slate-800" : "bg-slate-100";

  const amountColor = isDark ? "text-cyan-300" : "text-cyan-600";

  const buttonBase = isDark
    ? "bg-slate-800 text-slate-300"
    : "bg-slate-100 text-slate-700";

  const borderColor = isDark ? "border-slate-800/70" : "border-slate-200";
  const headerBorder = isDark ? "border-slate-700/40" : "border-slate-200";

  // ✅ FILTER
  const filteredExpenseList = expenseList.filter((e) => {
    const matchesSearch = e.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || e.category === categoryFilter;

    return matchesCategory && matchesSearch;
  });

  // ✅ SORT
  const sortedExpenseList = [...filteredExpenseList].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      case "nameAz":
        return a.name.localeCompare(b.name);
      case "nameZa":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const getCategoryIcon = (category) => {
    const categoryObj = EXPENSE_CATEGORIES.find((c) => c.value === category);
    return categoryObj?.emoji || "📦";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg backdrop-blur-xl transition-all duration-300 ${containerStyle}`}
    >
      {/* gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5" />

      {/* HEADER */}
      <div
        className={`flex items-center justify-between border-b px-6 py-4 ${headerBorder}`}
      >
        <h2 className={`font-semibold tracking-wide ${textPrimary}`}>
          Recent Expenses
        </h2>

        <span className={`text-xs ${textSecondary}`}>
          {filteredExpenseList.length} / {expenseList.length} items
        </span>
      </div>

      {/* EMPTY */}
      {expenseList.length === 0 ? (
        <div className="py-14 text-center">
          <p className="mb-4 text-6xl">💸</p>

          <p className={`text-lg font-medium ${textPrimary}`}>
            No expenses yet
          </p>

          <p className={`mt-1 text-sm ${textSecondary}`}>
            Start tracking your spending
          </p>
        </div>
      ) : (
        <ul className="max-h-96 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400/40 hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/70 [&::-webkit-scrollbar-track]:bg-transparent">
          {sortedExpenseList.length === 0 ? (
            <li className={`mt-1 p-4 text-sm ${textSecondary}`}>
              No expense matching...
            </li>
          ) : (
            sortedExpenseList.map((exp) => (
              <li
                key={exp.id}
                className={`group mx-4 border-b last:border-b-0 ${borderColor}`}
              >
                {/* ROW */}
                <div
                  className={`flex items-center gap-4 px-5 py-4 transition-all ${rowHover}`}
                >
                  {/* ICON */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${iconBg}`}
                  >
                    {getCategoryIcon(exp.category)}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <p className={`truncate font-medium ${textPrimary}`}>
                      {exp.name}
                    </p>

                    <p className={`mt-1 text-xs ${textSecondary}`}>
                      {exp.category} •{" "}
                      {new Date(exp.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>

                  {/* AMOUNT */}
                  <span
                    className={`font-semibold whitespace-nowrap ${amountColor}`}
                  >
                    ₹{Number(exp.amount).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="max-h-20 overflow-hidden transition-all duration-300 sm:max-h-0 sm:group-hover:max-h-20">
                  <div className="flex px-5 pb-3">
                    <div className="ml-auto flex gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => startEditing(exp.id)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${buttonBase} hover:text-cyan-400`}
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => openDeleteModal(exp.id)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${buttonBase} hover:text-red-400`}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
