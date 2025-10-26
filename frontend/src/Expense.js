// Import React hook
import React, { useState, useEffect } from 'react';
//Imported class
import RestClient from './RestClient';
import AddExpenseForm from './AddExpenseForm';
import ExpenseDetails from './ExpenseDetails';

// Import css file
import './ExpenseDetails.css';
import './AddExpenseForm.css';

export default function Expense() {
  // State for list display
  const [expenses, setExpenses] = useState([]);

  // Auto-load expenses on mount
  useEffect(() => {
    RestClient.getExpenses()
      .then((expenses) => setExpenses(expenses))
      .catch((err) => alert(err));
  }, []);

  // Refresh handler
  const handleAddExpense = async (expenseData) => {
    try {
      await RestClient.addExpense({ expenseData });
      //Refresh list
      const refreshList = await RestClient.getExpenses();
      //Set w/ list or empty array as fail-safe
      setExpenses(refreshList || []);
    } catch (err) {
      console.error('Failed to create expenses:', err);
    }
  };

  return (
    <div className="expenses-page">
      <section className="split-view">
        <div className="pane upper">
          <h1>Your Expenses</h1>
          <ExpenseDetails expenses={expenses} />
        </div>
        <div className="pane lower">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </div>
      </section>
    </div>
  );
}
