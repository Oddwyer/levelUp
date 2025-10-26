// Import React hook
import React, { useState, useEffect } from 'react';

// This component addes an expense.
export default function AddExpenseForm({ onAddExpense }) {
  // "Expense" object via form + defines "form" and "setForm"
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    expense_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // OnClick Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new expense object
    const expenseData = {
      amount: Number(form.amount),
      category: form.category,
      description: form.description,
      expense_date: form.expense_date,
    };

    //Pass to Expense.js
    await onAddExpense(expenseData);

    //Reset form
    setForm({ amount: '', category: '', description: '', expense_date: '' });
  };

  // Expense form display settings
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense_date">Transaction Date:</label>
          <input
            type="date"
            id="expense_date"
            name="expense_date"
            value={form.expense_date}
            onChange={(e) => setForm({ ...form, expense_date: e.target.value })}
          />
        </div>
        <button type="submit">Save Expense</button>
      </form>
    </div>
  );
}
