import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import SearchExpense from "./SearchExpense";
import { useExpenseStore } from "../store/expenseStore";
import { useEffect } from "react";
import SortExpense from "./SortExpense";
import { Moon, Sun } from "lucide-react";
import ExpenseChart from "./ExpenseChart";
import { generatePDF } from "../utils/generatePdf";
import { getFilteredExpenseList } from "../utils/filterExpenses";

const Header = () => {
  const expenseList = useExpenseStore((state) => state.expenseList);
  const total = expenseList.reduce((acc, curr) => acc + curr.amount, 0);

  const closeModal = useExpenseStore((state) => state.closeModal);
  const modalType = useExpenseStore((state) => state.modalType);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const selectedExpenseId = useExpenseStore((state) => state.selectedExpenseId);
  const theme = useExpenseStore((state) => state.theme);
  const toggleTheme = useExpenseStore((state) => state.toggleTheme);
  const openExpenseModal = useExpenseStore((state) => state.openExpenseModal);

  const searchTerm = useExpenseStore((state) => state.searchTerm);
  const categoryFilter = useExpenseStore((state) => state.categoryFilter);

  const filteredExpenseList = getFilteredExpenseList(
    expenseList,
    searchTerm,
    categoryFilter
  );

  const isDark = theme === "dark";

  const pageText = isDark ? "text-white" : "text-slate-900";
  const subText = isDark ? "text-slate-400" : "text-slate-500";

  const themeBtn = isDark
    ? "bg-slate-800 border-slate-700 text-slate-300"
    : "bg-white border-slate-300 text-slate-700";

  const addBtn = isDark
    ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
    : "bg-cyan-500/10 border-cyan-500/30 text-cyan-600";

  const modalCard = isDark
    ? "bg-slate-800/60 border border-slate-700/50 text-white"
    : "bg-white border border-slate-200 text-slate-900";

  const secondaryBtn = isDark
    ? "bg-slate-700 text-white"
    : "bg-slate-100 text-slate-800";

  // ✅ ESC CLOSE
  useEffect(() => {
    if (!modalType) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalType]);

  return (
    <div
      className={`relative z-10 min-h-screen w-full space-y-8 px-4 sm:px-6 lg:px-8 ${pageText}`}
    >
      {/* ✅ THEME TOGGLE */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`rounded-xl border p-3 transition-all hover:text-cyan-400 ${themeBtn}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* ✅ HEADER */}
      <div className="space-y-4 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 shadow-inner">
          <span className="text-3xl">💰</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Expense Tracker
          </h1>

          <p className={`mt-1 text-sm ${subText}`}>
            Track your daily spending easily
          </p>
        </div>
      </div>

      {/* ✅ ADD BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={openExpenseModal}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03] ${addBtn}`}
        >
          ➕ Add Expense
        </button>
      </div>

      {/* ✅ MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60"
            onClick={closeModal}
          />

          {/* modal */}
          <div className="relative z-10 w-full max-w-lg">
            {modalType === "expense" && <AddExpenseForm />}

            {modalType === "delete" && (
              <div className={`rounded-3xl p-6 shadow-2xl ${modalCard}`}>
                <h2 className="text-xl font-semibold">Delete Expense</h2>

                <p className={`mt-2 text-sm ${subText}`}>
                  Are you sure you want to delete this expense?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className={`rounded-xl px-4 py-2 ${secondaryBtn}`}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      deleteExpense(selectedExpenseId);
                      closeModal();
                    }}
                    className="rounded-xl bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ TOTAL CARD */}
      <div
        className={`sticky top-4 z-10 flex items-center justify-between rounded-2xl px-6 py-5 shadow-lg ${
          isDark
            ? "border border-slate-700 bg-linear-to-r from-slate-800 via-slate-800 to-slate-700 text-white"
            : "border border-slate-200 bg-linear-to-r from-white to-slate-100 text-slate-900"
        }`}
      >
        <div>
          <p className="text-xs tracking-widest uppercase opacity-80">Total</p>

          <p className="text-3xl font-black tracking-tight">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-90">{expenseList.length} items</p>
        </div>
      </div>

      {/* ✅ SEARCH + SORT */}
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-md backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-4">
          {/* ROW 1 (Search only) */}
          <div className="w-full">
            <SearchExpense />
          </div>

          {/* ROW 2 (Sort + Export in same row) */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-auto sm:min-w-35">
              <SortExpense />
            </div>

            <button
              onClick={() => generatePDF(filteredExpenseList)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm transition-all duration-200 hover:bg-cyan-500 hover:text-white hover:shadow-md focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:outline-none sm:w-auto dark:border-cyan-400 dark:bg-transparent dark:text-cyan-300 dark:hover:bg-cyan-500"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* ✅ LIST */}
      <ExpenseList />
      <ExpenseChart />
    </div>
  );
};

export default Header;
