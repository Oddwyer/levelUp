// Import React Hook
import React, { useState } from 'react';

// Child - AddExpenseForm Component Function
export default function AddExpenseForm({ onAddExpense }) {

  // "Expense" Object Variables + Define Form / SetForm
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    expense_date: '',
  });

  // Changes to Expense Form Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // OnClick Save Expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create New Expense Object
    const expenseData = {
      amount: Number(form.amount),
      category: form.category,
      description: form.description,
      expense_date: form.expense_date,
    };

    // Invoke When Receive Form from Expense.js
    await onAddExpense(expenseData);

    // Reset Form
    setForm({ amount: '', category: '', description: '', expense_date: '' });
  };

  // Expense Form Dispay + Save Expense Button
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      {/* Expense Form + Invoke Submission*/}
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
