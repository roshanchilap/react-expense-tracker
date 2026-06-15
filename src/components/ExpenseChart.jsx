import {
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useExpenseStore } from "../store/expenseStore";
import { useMemo } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const ExpenseChart = () => {
  const expenseList = useExpenseStore((state) => state.expenseList);

  // ✅ Memoized data processing (performance optimization)
  const chartData = useMemo(() => {
    const categoryTotals = expenseList.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    // Convert + sort (highest first)
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenseList]);

  // ✅ Handle empty state
  if (chartData.length === 0) {
    return <p className="mt-4 text-center">No data to display</p>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Expense Breakdown</h2>

      <div className="h-80 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* ✅ Better Tooltip */}
            <Tooltip formatter={(value) => `₹ ${value}`} />

            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
