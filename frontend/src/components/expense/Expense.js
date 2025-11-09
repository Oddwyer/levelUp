// Import React Hook
import React, { useState, useEffect } from 'react';

// Imported Components
import ExpenseClient from './ExpenseClient';
import AddExpenseForm from './AddExpenseForm';
import ExpenseDetails from './ExpenseDetails';

// Import css Files
import './ExpenseDetails.css';
import './AddExpenseForm.css';
import './Expense.css';

// Parent Expense Container Function (Holds Expense Details + Add Expense Form)
export default function Expense() {
  // State for List Display
  const [expenses, setExpenses] = useState([]);
  // State for Boolean Values
  const [loading, setLoading] = useState(true);

  // Auto-Load Expenses on Mount
  useEffect(() => {
    (async () => {
      const data = await ExpenseClient.getExpenses(); // optionally pass userId
      setExpenses(Array.isArray(data) ? data : []);
      setLoading(false);
    })();
  }, []);

  // Refresh Handler After Successful Post
  const handleAddExpense = async (expenseData) => {
    setLoading(true);
    try {
      await ExpenseClient.addExpense({ expenseData });
      //Refresh list
      const refreshList = await ExpenseClient.getExpenses();
      //Set w/ list or empty array as fail-safe
      setExpenses(refreshList || []);
    } catch (err) {
      console.error('Failed to create expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Parent Expense Display
  return (
    <div className="expenses-page">
      {/* "Your Expense" Header */}
      <h1>Expenses</h1>
      <section className="split-view">
        <div className="pane left">
          {/* "Expense Details" Display */}
          <ExpenseDetails expenses={expenses} />
        </div>
        <div className="pane right">
          {/* "Add Expense Form" Display */}
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </div>
      </section>
    </div>
  );
}
