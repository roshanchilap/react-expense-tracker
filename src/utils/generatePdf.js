import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (expenseList) => {
  try {
    if (!expenseList || expenseList.length === 0) {
      console.warn("No data");
      return;
    }
    console.log(expenseList);

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Report", 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 28);

    const tableData = expenseList.map((expense) => [
      expense.name,
      expense.category,
      `Rs. ${expense.amount}`,
      new Date(expense.date).toLocaleDateString("en-IN"),
    ]);

    // ✅ FIXED: use doc.autoTable
    autoTable(doc, {
      startY: 35,
      head: [["Name", "Category", "Amount", "Date"]],
      body: tableData,
    });

    const total = expenseList.reduce(
      (acc, curr) => acc + Number(curr.amount || 0),
      0
    );

    const finalY = doc.lastAutoTable?.finalY || 40;

    doc.setFontSize(12);

    doc.text(
      `Total Expenses: Rs. ${total.toLocaleString("en-IN")}`,
      14,
      finalY + 15
    );

    doc.save("expense-report.pdf");
  } catch (err) {
    console.error("PDF ERROR:", err);
  }
};
