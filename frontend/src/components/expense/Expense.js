// Import React Hooks
// useEffect -> Used once or occasional clean-up when asked. 
// useState returns an array with TWO things: variable and setter w/ initial state.
import { useState, useEffect } from 'react';

// Imported Components
import ExpenseClient from './ExpenseClient';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

// Import css Files
import './ExpenseDetails.css';
import './ExpenseForm.css';
import './Expense.css';

// Parent Expense Container Component
// - Owns the list of expenses
// - Owns which expense is currently selected for editing
// - Passes data + callbacks to children
export default function Expense() {

  // State for expense list display
  const [expenses, setExpenses] = useState([]);

  // State for expense currently being edited (null means "add mode")
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Auto-Load Expenses on Mount
  useEffect(() => {
    (async () => {
      try {
        const data = await ExpenseClient.getExpenses();
        // Store in Array
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load expenses:", err);
        setExpenses([]); // fail-safe
      }
    }
    )();
  }, []);

  // Refresh Handler After Successful ADD or UPDATE 
  // The form will call this with a `expenseData` object that may or may not have an `id`.
  // - If `expenseData.id` exists  -> UPDATE (PUT)
  // - If `expenseData.id` is empty -> CREATE (POST)
  const handleSubmitExpense = async (expenseData) => {
    try {

      //If expense ID provided -> update expense
      if (expenseData.id) {
        const updated = await ExpenseClient.updateExpense(expenseData.id, expenseData);
        // Refresh list to display updated expenses
        setExpenses((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
        // Exit Edit Mode
        setSelectedExpense(null);
        return updated;
      }
      // If expense ID NOT provided -> add expense
      else {
        const newExpense = {...expenseData, userId: 1};
        const created = await ExpenseClient.addExpense(newExpense);
        // Refresh list to display added expense(s)
        setExpenses((prev) => [created, ...prev]);
        return created;
      }

    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Function - Cancel Edit Mode (clear form)
  const handleCancelEdit = () => {
    setSelectedExpense(null);
  };

  // Function - Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      // Invoke ExpenseClient deleteExpense method
      await ExpenseClient.deleteExpense(id);

      // Refresh list to display w/out expense
      setExpenses((prev )=> prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    } 
  };
  // Function - Edit Expense (load selected expense in form)
  const handleUpdateExpense = (expense) => {
    setSelectedExpense(expense);
  };

  // Parent Expense Display
  return (
    <div className="expenses-page">
      {/* "Page Title: Expense" Header */}
      <h1>Expenses</h1>
      <section className="split-view">
        <div className="pane left">
          {/* "Expense Details" Child */}
          <ExpenseDetails
            expenses={expenses}
            onUpdate={handleUpdateExpense}
            onDelete={handleDeleteExpense} />
        </div>
        <div className="pane right">
          {/* "Add/Update Expense Form" Child */}
          <ExpenseForm
            initialData={selectedExpense}
            onSubmit={handleSubmitExpense}
            onCancelEdit={handleCancelEdit} />
        </div>
      </section>
    </div>
  );
}
