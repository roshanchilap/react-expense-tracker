import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useExpenseStore = create(
  persist(
    (set) => ({
      //State
      expenseList: [],
      searchTerm: "",
      editingId: null,
      expenseInput: "",
      expenseAmount: "",
      expenseCategory: "",
      categoryFilter: "",
      modalType: null, // "expense" | "delete" | null
      selectedExpenseId: null,
      sortBy: "newest",
      showSortMenu: false,
      theme: "dark",

      //Actions
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      setShowSortMenu: (value) =>
        set({
          showSortMenu: value,
        }),

      toggleSortMenu: () =>
        set((state) => ({
          showSortMenu: !state.showSortMenu,
        })),
      setCategoryFilter: (value) => set({ categoryFilter: value }),

      setSortBy: (value) =>
        set({
          sortBy: value,
        }),

      setError: (message) =>
        set({
          error: message,
        }),

      setExpenseCategory: (value) =>
        set(() => ({
          expenseCategory: value,
        })),
      setExpenseInput: (value) =>
        set(() => ({
          expenseInput: value,
        })),
      setExpenseAmount: (value) =>
        set(() => ({
          expenseAmount: value,
        })),

      setEditing: (value) =>
        set(() => ({
          editingId: value,
        })),

      addExpense: (expense) =>
        set((state) => ({
          expenseList: [...state.expenseList, expense],
        })),

      deleteExpense: (id) => {
        toast.success("Expense deleted");
        set((state) => ({
          expenseList: state.expenseList.filter((exp) => exp.id !== id),
        }));
      },
      editExpense: (updatedExpense) =>
        set((state) => ({
          expenseList: state.expenseList.map((exp) =>
            exp.id === updatedExpense.id ? updatedExpense : exp
          ),
        })),
      setSearchTerm: (value) =>
        set(() => ({
          searchTerm: value,
        })),

      openExpenseModal: () =>
        set({
          modalType: "expense",
        }),

      openDeleteModal: (id) =>
        set({
          modalType: "delete",
          selectedExpenseId: id,
        }),

      closeModal: () =>
        set({
          modalType: null,
          selectedExpenseId: null,
          editingId: null,
          expenseInput: "",
          expenseAmount: "",
          expenseCategory: "",
        }),

      startEditing: (id) =>
        set((state) => {
          console.log("Editing:", id);
          const exp = state.expenseList.find((exp) => exp.id === id);
          return {
            modalType: "expense",
            editingId: exp.id,
            expenseInput: exp.name,
            expenseAmount: exp.amount,
            expenseCategory: exp.category,
          };
        }),

      submitExpense: () =>
        set((state) => {
          if (!state.expenseInput.trim()) {
            toast.error("Expense name is required");
            return state;
          }

          if (!state.expenseCategory) {
            toast.error("Please select a category");
            return state;
          }

          if (!state.expenseAmount) {
            toast.error("Amount is required");
            return state;
          }

          if (Number(state.expenseAmount) <= 0) {
            toast.error("Amount must be greater than 0");
            return state;
          }

          if (state.editingId) {
            toast.success("Expense updated");
            return {
              expenseList: state.expenseList.map((exp) =>
                exp.id === state.editingId
                  ? {
                      ...exp,
                      name: state.expenseInput,
                      amount: Number(state.expenseAmount),
                      category: state.expenseCategory,
                      date: new Date(),
                    }
                  : exp
              ),
              editingId: null,
              expenseAmount: "",
              expenseInput: "",
              modalType: null,
              expenseCategory: "",
            };
          }
          toast.success("Expense added");

          return {
            expenseList: [
              ...state.expenseList,
              {
                id: crypto.randomUUID(),
                name: state.expenseInput,
                amount: Number(state.expenseAmount),
                category: state.expenseCategory,
                date: new Date(),
              },
            ],
            expenseAmount: "",
            expenseInput: "",
            modalType: null,
            expenseCategory: "",
          };
          toast.success("Expense Added");
        }),
    }),
    {
      name: "expense-storage",
      partialize: (state) => ({
        expenseList: state.expenseList,
        theme: state.theme,
      }),
    }
  )
);
