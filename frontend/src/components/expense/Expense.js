// Import React Hook
import React, { useState, useEffect } from 'react';

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
  // State for List Display
  // Note: useState returns an array with TWO things: variable and setter w/ initial state.
  const [expenses, setExpenses] = useState([]);
  // Boolean Values for Loading States
  const [loading, setLoading] = useState(true);
  // The Expense Currently Being Edited (null means "add mode")
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
      } finally {
        setLoading(false);
      }
    }
    )();
  }, []);

  // Refresh Handler After Successful ADD or UPDATE 
  // The form will call this with a `expenseData` object that may or may not have an `id`.
  // - If `expenseData.id` exists  -> UPDATE (PUT)
  // - If `expenseData.id` is empty -> CREATE (POST)
  const handleSubmitExpense = async (expenseData) => {
    setLoading(true);

    try {
      //If ID Provided, Update Expense
      if (expenseData.id) {

        const updated = await ExpenseClient.updateExpense(expenseData.id, expenseData);

        // Refresh List to Display Updated Expenses
        setExpenses((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );

        // Exit Edit Mode
        setSelectedExpense(null);

        return updated;

        // If ID NOT Provided, Add Expense
      } else {

        const created = await ExpenseClient.addExpense(expenseData);

        // Refresh List to Display Added Expense
        setExpenses((prev) => [created, ...prev]);

        return created;
      }

    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Edit Mode (return to add mode)
  const handleCancelEdit = () => {
    setSelectedExpense(null);
  };

  // Delete Expense
  const handleDeleteExpense = async (id) => {
    setLoading(true);
    try {
      await ExpenseClient.deleteExpense(id);

      // Refresh List w/out Expense
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    } finally {
      setLoading(false);
    }
  };
  // When Edit Requested
  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
  };

  // Parent Expense Display
  return (
    <div className="expenses-page">
      {/* "Page Title: Expense" Header */}
      <h1>Expenses</h1>
      <section className="split-view">
        <div className="pane left">
          {/* "Expense Details" Display */}
          <ExpenseDetails 
          expenses={expenses} 
          onEdit={handleEditExpense} 
          onDelete={handleDeleteExpense} />
        </div>
        <div className="pane right">
          {/* "Add/Update Expense Form" Display */}
          <ExpenseForm 
          initialData={selectedExpense} 
          onSubmit={handleSubmitExpense} 
          onCancelEdit={handleCancelEdit} />
        </div>
      </section>
    </div>
  );
}
