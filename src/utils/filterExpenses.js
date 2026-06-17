export const getFilteredExpenseList = (
  expenseList,
  searchTerm,
  categoryFilter
) => {
  return expenseList.filter((e) => {
    const matchesSearch = e.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || e.category === categoryFilter;

    return matchesCategory && matchesSearch;
  });
};
