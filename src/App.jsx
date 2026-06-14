import React from "react";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useExpenseStore } from "./store/expenseStore";

const App = () => {
  const theme = useExpenseStore((state) => state.theme);

  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-6 py-10 transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Background Glow */}
      {isDark && (
        <>
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        </>
      )}

      {/* Light Theme Background Accent */}
      {!isDark && (
        <>
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        </>
      )}

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-md">
        <Header />

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: isDark
              ? {
                  background: "#0f172a",
                  color: "#ffffff",
                  border: "1px solid #334155",
                }
              : {
                  background: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #e2e8f0",
                },
          }}
        />
      </div>
    </div>
  );
};

export default App;
